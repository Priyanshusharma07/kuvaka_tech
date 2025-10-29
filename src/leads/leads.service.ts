import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entity/lead.entity';
import { Offer } from '../offers/entity/offer.entity';
import { Readable } from 'stream';
import csvParser from 'csv-parser';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

@Injectable()
export class LeadsService {
    private readonly openRouterApiKey: string;
    private readonly openRouterUrl = 'https://openrouter.ai/api/v1/chat/completions';

    constructor(
        @InjectRepository(Lead)
        private readonly leadRepo: Repository<Lead>,

        @InjectRepository(Offer)
        private readonly offerRepo: Repository<Offer>,
    ) {
        this.openRouterApiKey = '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';
        if (!this.openRouterApiKey) {
            throw new Error('❌ Missing OPENROUTER_API_KEY in environment variables');
        }
    }

    /**
     * 📤 Upload leads via CSV
     */
    async uploadLeads(file: Express.Multer.File): Promise<Lead[]> {
        if (!file || !file.buffer) {
            throw new HttpException('Invalid file upload', HttpStatus.BAD_REQUEST);
        }

        const leads: Partial<Lead>[] = [];
        const stream = Readable.from(file.buffer);

        return new Promise((resolve, reject) => {
            stream
                .pipe(csvParser())
                .on('data', (row) => {
                    leads.push({
                        name: row.name,
                        role: row.role,
                        company: row.company,
                        industry: row.industry,
                        location: row.location,
                        linkedin_bio: row.linkedin_bio,
                    });
                })
                .on('end', async () => {
                    try {
                        const saved = await this.leadRepo.save(leads);
                        resolve(saved);
                    } catch (err) {
                        reject(err);
                    }
                })
                .on('error', (err) => reject(err));
        });
    }

    /**
     * ⚙️ Run rule + AI scoring pipeline
     */
    async runScoringPipeline(offerId: string): Promise<Lead[]> {
        const offer = await this.offerRepo.findOne({ where: { id: offerId } });
        if (!offer) {
            throw new HttpException('Offer not found', HttpStatus.NOT_FOUND);
        }

        const leads = await this.leadRepo.find({ where: { scored: false } });
        const scoredLeads: Lead[] = [];

        for (const lead of leads) {
            // ----- RULE LAYER -----
            let ruleScore = 0;

            // Role relevance
            const role = lead.role?.toLowerCase() || '';
            if (
                role.includes('head') ||
                role.includes('founder') ||
                role.includes('chief') ||
                role.includes('director')
            ) {
                ruleScore += 20;
            } else if (role.includes('manager') || role.includes('lead')) {
                ruleScore += 10;
            }

            // Industry match
            const matchIndustry = offer['ideal_use_cases']?.some((useCase) =>
                lead.industry?.toLowerCase().includes(useCase.toLowerCase()),
            );
            if (matchIndustry) ruleScore += 20;
            else if (
                offer['value_props']?.some((prop) =>
                    lead.industry?.toLowerCase().includes(prop.toLowerCase()),
                )
            )
                ruleScore += 10;

            // Data completeness
            if (
                lead.name &&
                lead.role &&
                lead.company &&
                lead.industry &&
                lead.location &&
                lead.linkedin_bio
            ) {
                ruleScore += 10;
            }

            // ----- AI LAYER -----
            const aiResponse = await this.getAIIntent(lead, offer);
            const aiPoints =
                aiResponse.intent === 'High'
                    ? 50
                    : aiResponse.intent === 'Medium'
                        ? 30
                        : 10;

            // Final score
            const totalScore = ruleScore + aiPoints;

            lead.intent = aiResponse.intent;
            lead.reasoning = aiResponse.reasoning;
            lead.score = totalScore;
            lead.scored = true;

            await this.leadRepo.save(lead);
            scoredLeads.push(lead);
        }

        return scoredLeads;
    }

    /**
     * 🧠 AI Layer using OpenRouter (ChatGPT-style API)
     */
    async getAIIntent(lead: Lead, offer: Offer) {
        const prompt = `
You are an AI sales assistant.
Given the following lead and offer details, classify the buying intent as High, Medium, or Low.
Then explain the reasoning briefly in one sentence.

Offer: ${offer.name}
Value Props: ${offer['value_props']}
Ideal Use Cases: ${offer['ideal_use_cases']}

Lead:
- Name: ${lead.name}
- Role: ${lead.role}
- Company: ${lead.company}
- Industry: ${lead.industry}
- Location: ${lead.location}
- Bio: ${lead.linkedin_bio}

Return JSON like:
{"intent":"High","reasoning":"<one-line reasoning>"}
`;

        try {
            const response = await fetch(this.openRouterUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.openRouterApiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini', // ✅ or any OpenRouter-supported model
                    messages: [{ role: 'user', content: prompt }],
                }),
            });

            const data = await response.json();
            const rawText = data?.choices?.[0]?.message?.content?.trim() || '';

            // ✅ Remove Markdown fences like ```json ... ```
            const cleanedText = rawText.replace(/```json|```/g, '').trim();

            const parsed = JSON.parse(cleanedText);
            return {
                intent: parsed.intent || 'Medium',
                reasoning: parsed.reasoning || 'No reasoning provided.',
            };
        } catch (err) {
            console.error('OpenRouter API Error:', err);
            return {
                intent: 'Medium',
                reasoning: 'Defaulted due to AI error.',
            };
        }
    }

    /**
     * 📊 Get all scored leads
     */
    async getResults(): Promise<Lead[]> {
        return this.leadRepo.find({ where: { scored: true } });
    }
}
