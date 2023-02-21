import { createClient } from '@supabase/supabase-js';

const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;

export const supabase = supabaseUrl && supabaseKey && createClient(supabaseUrl, supabaseKey);

// export default supabase;
