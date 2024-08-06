import { Button } from '@/components/ui/button';
import { Edit3, Trash } from 'lucide-react';

export default function TaskItem({ tasks }: any) {
  return (
    <div className="space-y-4">
      {tasks.map((task: any) => (
        <div
          className="border rounded-lg flex items-center justify-between px-6 py-3 shadow-sm"
          key={task.id}
        >
          <p className="font-medium">{task.name}</p>
          <div className="space-x-2">
            <Button size={'sm'}>
              <Edit3 className="w-4 h-4" />
            </Button>
            <Button variant={'destructive'} size={'sm'}>
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
