'use server';

import { createSupabaseClient } from '@/supabase/supabase-server';
import { TaskSchema } from '@/validators/task';
import { z } from 'zod';

// Function to create a Task
export const createTask = async (data: z.infer<typeof TaskSchema>) => {
  const supabase = await createSupabaseClient();
  const { task } = data;

  try {
    // Insert the task into the 'tasks' table
    const { error } = await supabase
      .from('tasks')
      .insert({ name: task })
      .select();

    if (error) {
      return {
        success: false,
        error: `Failed to create task: ${error.message}`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to create task:', error);
    return { success: false, error: 'Failed to create task' };
  }
};
