import { z } from 'zod';

export const OnboardingSchema = z.object({
  company: z.string().min(2, {
    message: 'Company Name must be at least 2 characters.',
  }),
});
