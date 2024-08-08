'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';

import { TaskSchema } from '@/validators/task';
import { createTask } from '@/app/(platform)/dashboard/_actions';
import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';

export default function CreateTask() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      id: 0,
      task: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof TaskSchema>) => {
    startTransition(async () => {
      const res = await createTask(data);
      if (res?.success) {
        toast({
          title: 'Success',
          description: (
            <pre className="mt-2 w-[340px] text-white rounded-md bg-slate-950 p-4">
              Task created!
            </pre>
          ),
        });
        form.reset();
      } else {
        toast({
          title: 'Error:',
          description: (
            <pre className="mt-2 w-[340px] text-white rounded-md bg-slate-950 p-4">
              {res?.error}
            </pre>
          ),
        });
      }
    });
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
                    placeholder="create todays tasks..."
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} className="flex gap-2" type="submit">
            {isPending && <Loader2 className="animate-spin size-5" />}Add Task
          </Button>
        </form>
      </Form>
    </div>
  );
}
