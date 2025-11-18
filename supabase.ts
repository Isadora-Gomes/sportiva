import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";

const url = "https://fibgxganwozosmzuppnj.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpYmd4Z2Fud296b3NtenVwcG5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MzQ4NzEsImV4cCI6MjA3NzQxMDg3MX0.etV2Z_mDltv3fdh25HobU0w2pZNgIXeICNaOW8XiEnY";

const supabase = createClient(url, key, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

export default supabase;