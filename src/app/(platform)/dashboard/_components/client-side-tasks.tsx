'use client';

import { useSupabase } from '@/supabase/supabase-client';
import { useEffect, useState } from 'react';
import TaskItem from './task-item';

export default function ClientSideTasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = useSupabase();

  useEffect(() => {
    async function fetchTasks() {
      if (supabase) {
        setLoading(true);
        const { data, error } = await supabase.from('tasks').select();
        if (data) setTasks(data);
        setLoading(false);
      }
    }

    fetchTasks();
  }, [supabase]);

  if (loading) return <div>Loading...</div>;

  return <TaskItem tasks={tasks} />;
}
