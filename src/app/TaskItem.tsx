'use client';
import { useState } from 'react';
import { updateTaskAction, archiveTaskAction, restoreTaskAction } from '../../lib/actions';
import { isOverdue } from '../../lib/utils';
import { Task } from '../../lib/tasks';

export function TaskItem({ task, showArchived }: { task: Task; showArchived: boolean }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? '');
  const [dueDate, setDueDate] = useState(task.due_date);
  const [topic, setTopic] = useState(task.topic);

  async function handleStatusChange() {
    const nextStatus = task.status === 'Todo' ? 'In-Progress' :
                       task.status === 'In-Progress' ? 'Complete' : 'Todo';
    await updateTaskAction(task.id, { status: nextStatus as 'Todo' | 'In-Progress' | 'Complete' });
  }

  async function handleArchive() {
    await archiveTaskAction(task.id);
  }

  async function handleRestore() {
    await restoreTaskAction(task.id);
  }

  async function handleSaveEdit() {
    if (!title || !dueDate || !topic) {
      alert('Title, Due Date, and Topic are required!');
      return;
    }
    await updateTaskAction(task.id, {
      title,
      description: description || null,
      due_date: dueDate,
      topic,
    });
    setIsEditing(false);
  }

  function handleCancelEdit() {
    setTitle(task.title);
    setDescription(task.description ?? '');
    setDueDate(task.due_date);
    setTopic(task.topic);
    setIsEditing(false);
  }

  const overdue = isOverdue(task) && task.status !== 'Complete';

  if (isEditing) {
    return (
      <li>
        <article className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div className="space-y-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded p-2 w-full"
              aria-label="Edit title"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded p-2 w-full"
              rows={2}
              aria-label="Edit description"
            />
            <div className="flex gap-2">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border rounded p-2"
                aria-label="Edit due date"
              />
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="border rounded p-2"
                aria-label="Edit topic"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={handleSaveEdit} className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded">
                Save
              </button>
              <button onClick={handleCancelEdit} className="bg-gray-300 hover:bg-gray-400 text-sm px-3 py-1 rounded">
                Cancel
              </button>
            </div>
          </div>
        </article>
      </li>
    );
  }

  return (
    <li>
      <article className={`bg-white rounded-lg shadow p-4 border-l-4 transition-all duration-150 hover:shadow-md hover:scale-[1.01] ${
        overdue ? 'border-red-500 bg-red-50' : 'border-blue-500'
      }`}>
        <header className="flex justify-between items-start">
          <hgroup className="flex-1">
            <h3 className="font-semibold text-lg text-blue-900">{task.title}</h3>
            {task.description && <p className="text-gray-600">{task.description}</p>}
          </hgroup>
          <menu className="flex space-x-2">
            {!showArchived ? (
              <>
                <button onClick={() => setIsEditing(true)} className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded transition-colors duration-200" aria-label={`Edit "${task.title}"`}>
                  Edit
                </button>
                <button onClick={handleStatusChange} className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded transition-colors duration-200" aria-label={`Change status of "${task.title}"`}>
                  {task.status === 'Todo' ? 'Start' : task.status === 'In-Progress' ? 'Complete' : 'Reset'}
                </button>
                <button onClick={handleArchive} className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded transition-colors duration-200" aria-label={`Archive "${task.title}"`}>
                  Archive
                </button>
              </>
            ) : (
              <button onClick={handleRestore} className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded transition-colors duration-200" aria-label={`Restore "${task.title}"`}>
                Restore
              </button>
            )}
          </menu>
        </header>
        <footer className="flex flex-wrap gap-2 mt-1 text-sm text-gray-500">
          <time className="text-gray-600" dateTime={task.due_date}>📅 {task.due_date}</time>
          <span className="sr-only">Topic:</span>
          <span className="text-gray-600">📂 {task.topic}</span>
          <span className="sr-only">Status:</span>
          <span className="text-gray-600">📌 {task.status}</span>
          {overdue && <strong className="text-red-500 font-bold">⚠️ OVERDUE</strong>}
        </footer>
      </article>
    </li>
  );
}