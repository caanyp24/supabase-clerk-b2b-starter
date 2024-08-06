'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';

import { TaskSchema } from '@/validators/task';
import { createTask } from '@/app/(platform)/dashboard/_actions';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

export default function CreateTask() {
  const router = useRouter();

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      id: 0,
      task: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof TaskSchema>) => {
    const res = await createTask(data);
    if (res?.success) {
      router.refresh();
      toast({
        title: 'Success',
      });
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
    <div className="space-y-8 flex flex-col items-center">
      <p className="text-5xl font-bold text-center">Create Task</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-start justify-center gap-4 w-full"
        >
          <FormField
            control={form.control}
            name="task"
            render={({ field }) => (
              <FormItem className="w-full max-w-md">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="create todays task"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add Task</Button>
        </form>
      </Form>
    </div>
  );
}
