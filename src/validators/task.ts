import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.number(),
  task: z.string().min(1, 'Task is required'),
});
