import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://iithomjevgrncxuwyslc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpdGhvbWpldmdybmN4dXd5c2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MjI3MTAsImV4cCI6MjA1MDA5ODcxMH0.br5_WHjfYFkLw9uRDn2au4or50Gh2XyAySJ1zAOodxU'
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
