'use client';
import { updateTaskAction, archiveTaskAction } from '../../lib/actions';
import { isOverdue } from '../../lib/utils';
import { Task } from '../../lib/tasks';

export function TaskItem({ task, showArchived }: { task: Task; showArchived: boolean }) {
  async function handleStatusChange() {
    const nextStatus = task.status === 'Todo' ? 'In-Progress' :
                       task.status === 'In-Progress' ? 'Complete' : 'Todo';
    await updateTaskAction(task.id, { status: nextStatus as 'Todo' | 'In-Progress' | 'Complete' });
  }

  async function handleArchive() {
    await archiveTaskAction(task.id);
  }

  return (
    <li>
      <article className={`bg-white rounded-lg shadow p-4 border-l-4 ${
        isOverdue(task) && task.status !== 'Complete'
          ? 'border-red-500 bg-red-50'
          : 'border-blue-500'
      }`}>
        <header className="flex justify-between items-start">
          <hgroup className="flex-1">
            <h3 className="font-semibold text-lg">{task.title}</h3>
            {task.description && <p className="text-gray-600">{task.description}</p>}
          </hgroup>
          <menu className="flex space-x-2">
            {!showArchived && (
              <>
                <button
                  onClick={handleStatusChange}
                  className="bg-green-500 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
                  aria-label={`Change status of "${task.title}"`}
                >
                  {task.status === 'Todo' ? 'Start' :
                   task.status === 'In-Progress' ? 'Complete' : 'Reset'}
                </button>
                <button
                  onClick={handleArchive}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white text-sm px-3 py-1 rounded"
                  aria-label={`Archive "${task.title}"`}
                >
                  Archive
                </button>
              </>
            )}
          </menu>
        </header>
        <footer className="flex flex-wrap gap-2 mt-1 text-sm text-gray-500">
          <time className="text-gray-600" dateTime={task.due_date}>📅 {task.due_date}</time>
          <span className="sr-only">Topic:</span>
          <span className="text-gray-600">📂 {task.topic}</span>
          <span className="sr-only">Status:</span>
          <span className="text-gray-600">📌 {task.status}</span>
          {isOverdue(task) && task.status !== 'Complete' && (
            <strong className="text-red-500 font-bold">⚠️ OVERDUE</strong>
          )}
        </footer>
      </article>
    </li>
  );
}