import { Task } from './tasks';

export function isOverdue(task: Task): boolean {
  if (task.status === 'Complete') return false;
  return new Date(task.due_date) < new Date();
}