'use client';

import { Button } from '@/components/ui/button';
import { Loader2, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deleteTask } from '../_actions';
import { toast } from '@/components/ui/use-toast';
import { useTransition } from 'react';

export default function DeleteTask({ task }: any) {
  const [isPending, startTransition] = useTransition();
  const onSubmit = async () => {
    startTransition(async () => {
      const res = await deleteTask(task);
      if (res?.success) {
        toast({
          title: 'Success',
          description: (
            <pre className="mt-2 w-[340px] text-white rounded-md bg-slate-950 p-4">
              Task deleted!
            </pre>
          ),
        });
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
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={'destructive'} size={'sm'}>
            <Trash className="w-4 h-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={isPending} onClick={() => onSubmit()}>
              {isPending && <Loader2 className="animate-spin size-5" />}Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
