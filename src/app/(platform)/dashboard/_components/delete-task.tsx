'use client';

import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
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
import { useRouter } from 'next/navigation';

export default function DeleteTask({ task }: any) {
  const router = useRouter();
  const onSubmit = async () => {
    const res = await deleteTask(task);
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
            <AlertDialogAction onClick={() => onSubmit()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
