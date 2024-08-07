'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';

import { TaskSchema } from '@/validators/task';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Edit3, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { updateTask } from '../_actions';
import { useState, useTransition } from 'react';

export default function UpdateTask({ task }: any) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      id: task.id,
      task: task.name,
    },
  });

  const onSubmit = async (data: z.infer<typeof TaskSchema>) => {
    startTransition(async () => {
      const res = await updateTask(data);
      if (res?.success) {
        setOpen(false);
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
    });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={'sm'}>
            <Edit3 className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Try it!</DialogTitle>
            <DialogDescription>Change the Task </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="task"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button
                  disabled={isPending}
                  className="flex gap-2"
                  type="submit"
                >
                  {isPending && <Loader2 className="animate-spin size-5" />}
                  Update
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    form.setValue('task', task?.name);
                  }}
                  variant={'outline'}
                >
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
