import { createSupabaseClient } from '@/supabase/supabase-server';
import CreateTask from './_components/create-task';
import TaskItem from './_components/task-item';
import ClientSideTasks from './_components/client-side-tasks';

export default async function Home() {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('tasks')
    .select()
    .order('id', { ascending: false });

  return (
    <div className="space-y-28">
      <CreateTask />
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-10">
          <p className="text-2xl text-center">Fetch on the Server</p>
          {!error ? <TaskItem tasks={data} /> : <p>{error?.message}</p>}
        </div>
        <ClientSideTasks />
      </div>
    </div>
  );
}
