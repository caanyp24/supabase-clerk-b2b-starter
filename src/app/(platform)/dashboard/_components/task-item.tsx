import DeleteTask from './delete-task';
import UpdateTask from './update-task';

export default function TaskItem({ tasks }: any) {
  return (
    <div className="space-y-4">
      {tasks?.map((task: any) => (
        <div
          className="border rounded-lg flex items-center justify-between px-6 py-3 shadow-sm"
          key={task.id}
        >
          <p className="font-medium">{task.name}</p>
          <div className="flex space-x-2">
            <UpdateTask task={task} />
            <DeleteTask task={task} />
          </div>
        </div>
      ))}
    </div>
  );
}
