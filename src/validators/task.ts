import { z } from 'zod';

export const TaskSchema = z.object({
  task: z.string().min(2, {
    message: 'Company Name must be at least 2 characters.',
  }),
});
