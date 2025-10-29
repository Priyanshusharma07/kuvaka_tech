import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor() {
        const SUPABASE_URL = process.env.SUPABASE_URL;
        const SUPABASE_KEY = process.env.SUPABASE_KEY;

        if (!SUPABASE_URL || !SUPABASE_KEY) {
            throw new Error(' Missing Supabase credentials in environment variables');
        }

        this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    }

    getClient() {
        return this.supabase;
    }
}
