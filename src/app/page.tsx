import { getActiveTasks, getArchivedTasks, getTasksSortedBy } from '../../lib/tasks';
import { TaskForm } from '@/app/TaskForm';
import { TaskControls } from '@/app/TaskControls';
import { TaskItem } from '@/app/TaskItem';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; sort?: string }>;
}) {
  const { view, sort } = await searchParams;
  const showArchived = view === 'archived';
  const sortBy = (sort as 'topic' | 'status' | 'due_date') || 'due_date';

  const tasks = showArchived
    ? await getArchivedTasks()
    : await getTasksSortedBy(sortBy);

  return (
    <main>
      <TaskForm />
      <TaskControls showArchived={showArchived} sortBy={sortBy} />
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} showArchived={showArchived} />
        ))}
      </ul>
    </main>
  );
}