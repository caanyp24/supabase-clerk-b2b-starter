'use client';

import { useSupabase } from '@/supabase/supabase-client';
import { useState } from 'react';
import TaskItem from './task-item';
import { Button } from '@/components/ui/button';

export default function ClientSideTasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const supabase = useSupabase();

  async function fetchTasks() {
    if (supabase) {
      setLoading(true);
      setShowTasks(true);
      const { data, error } = await supabase
        .from('tasks')
        .select()
        .order('id', { ascending: false });
      if (data) setTasks(data);
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={fetchTasks}>Fetch Tasks</Button>
      {loading ? (
        <div>Loading...</div>
      ) : (
        showTasks && <TaskItem tasks={tasks} />
      )}
    </div>
  );
}
