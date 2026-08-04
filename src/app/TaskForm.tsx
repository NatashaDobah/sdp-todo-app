'use client';
import { useState } from 'react';
import { createTaskAction } from '../../lib/actions';

export function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [topic, setTopic] = useState('');
  const [status, setStatus] = useState<'Todo' | 'In-Progress' | 'Complete'>('Todo');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !dueDate || !topic) {
      alert('Title, Due Date, and Topic are required!');
      return;
    }
    await createTaskAction({
      title,
      description: description || null,
      due_date: dueDate,
      topic,
      status,
      archived: false,
    });
    setTitle('');
    setDescription('');
    setDueDate('');
    setTopic('');
    setStatus('Todo');
  }

  return (
    <section className="bg-white rounded-lg shadow p-6 mb-8" aria-label="Create new task">
      <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="sr-only" htmlFor="task-title">Title</label>
          <input
            id="task-title"
            type="text"
            placeholder="Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2"
            required
            aria-required="true"
          />
          <label className="sr-only" htmlFor="task-topic">Topic</label>
          <input
            id="task-topic"
            type="text"
            placeholder="Topic *"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="border rounded p-2"
            required
            aria-required="true"
          />
          <label className="sr-only" htmlFor="task-due-date">Due Date</label>
          <input
            id="task-due-date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border rounded p-2"
            required
            aria-required="true"
          />
          <label className="sr-only" htmlFor="task-status">Status</label>
          <select
            id="task-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'Todo' | 'In-Progress' | 'Complete')}
            className="border rounded p-2"
            aria-label="Task status"
          >
            <option value="Todo">Todo</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Complete">Complete</option>
          </select>
        </fieldset>
        <label className="sr-only" htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded p-2 w-full"
          rows={2}
          aria-label="Task description"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </button>
      </form>
    </section>
  );
}