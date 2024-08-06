import { createSupabaseClient } from '@/supabase/supabase-server';
import { UserButton } from '@clerk/nextjs';
import CreateTask from './_components/create-task';
import TaskItem from './_components/task-item';
import ClientSideTasks from './_components/client-side-tasks';

export default async function Home() {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase.from('tasks').select();

  return (
    <div className="w-3/4 mx-auto space-y-28 mt-8">
      <UserButton />
      <CreateTask />
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-10">
          <p className="text-2xl text-center">Fetch on the Server</p>
          <TaskItem tasks={data} />
        </div>
        <div className="space-y-10">
          <p className="text-2xl text-center">Fetch on the Client</p>
          <ClientSideTasks />
        </div>
      </div>
    </div>
  );
}
