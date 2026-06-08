import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import CravaCopaApp from './CravaCopaApp'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  // Fetch todos from Supabase database
  const { data: todos } = await supabase.from('todos').select()

  return (
    <CravaCopaApp initialTodos={todos || []} />
  )
}
