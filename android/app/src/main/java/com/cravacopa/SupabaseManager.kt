package com.cravacopa

import android.content.Context
import io.github.jan_tennert.supabase.createSupabaseClient
import io.github.jan_tennert.supabase.auth.Auth
import io.github.jan_tennert.supabase.postgrest.Postgrest

object SupabaseManager {
    lateinit var client: io.github.jan_tennert.supabase.SupabaseClient
        private set

    fun initialize(context: Context) {
        val url = context.getString(R.string.supabase_url)
        val key = context.getString(R.string.supabase_anon_key)
        
        client = createSupabaseClient(
            supabaseUrl = url,
            supabaseKey = key
        ) {
            install(Auth)
            install(Postgrest)
        }
    }
}
