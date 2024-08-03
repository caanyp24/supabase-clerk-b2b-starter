import GetTasks from '@/components/get-tasks';
import { useSupabase } from '@/supabase/supabase-server';

export default async function Home() {
  const supabase = await useSupabase();

  const { data, error } = await supabase.from('tasks').select();

  return (
    <div>
      <h1>Fetch on the Server</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <h1>Fetch on the Client</h1>
      <GetTasks />
    </div>
  );
}
