'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { OnboardingSchema } from '@/validators/onboarding';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { completeOnboarding } from '../_actions';

export function OnboardingForm() {
  const { user } = useUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof OnboardingSchema>>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      company: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof OnboardingSchema>) => {
    const res = await completeOnboarding(data);

    if (res?.success) {
      await user?.reload();
      toast({
        title: 'Success',
      });
      router.push('/dashboard');
    } else {
      toast({
        title: 'Error:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            {res?.error}
          </pre>
        ),
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-4">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
