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

// Function to update a Task
export const updateTask = async (data: z.infer<typeof TaskSchema>) => {
  const supabase = await createSupabaseClient();
  const { task, id } = data;

  console.log(task);

  try {
    // Update the task in the 'tasks' table where id matches
    const { error } = await supabase
      .from('tasks')
      .update({ name: task })
      .eq('id', id);

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

// Function to delete a Task
export const deleteTask = async (task: any) => {
  const supabase = await createSupabaseClient();
  const { id } = task;

  try {
    // Delete the task from the 'tasks' table where id matches
    const { error } = await supabase.from('tasks').delete().eq('id', id);

    if (error) {
      return {
        success: false,
        error: `Failed to delete task: ${error.message}`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to delete task:', error);
    return { success: false, error: 'Failed to delete task' };
  }
};
