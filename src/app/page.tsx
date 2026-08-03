'use client';

import { useState, useEffect } from 'react';
import { 
  createTask, 
  getActiveTasks, 
  getArchivedTasks, 
  updateTask, 
  archiveTask, 
  isOverdue, 
  getTasksSortedBy, 
  Task 
} from '../../lib/tasks';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showArchived, setShowArchived] = useState(false);
  const [sortBy, setSortBy] = useState<'topic' | 'status' | 'due_date'>('due_date');
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [topic, setTopic] = useState('');
  const [status, setStatus] = useState<'Todo' | 'In-Progress' | 'Complete'>('Todo');

  // Load tasks whenever filters change
  const loadTasks = () => {
    const data = showArchived ? getArchivedTasks() : getTasksSortedBy(sortBy);
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, [showArchived, sortBy]);

  // Create a new task
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate || !topic) {
      alert('Title, Due Date, and Topic are required!');
      return;
    }
    
createTask({
  title,
  description: description || null,
  due_date: dueDate,
  topic,
  status,
  archived: false,  // ← ADD THIS
});
    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setTopic('');
    setStatus('Todo');
    
    loadTasks();
  };

  // Archive a task
  const handleArchive = (id: number) => {
    archiveTask(id);
    loadTasks();
  };

  // Toggle task status
  const handleStatusChange = (id: number, currentStatus: string) => {
    const nextStatus = currentStatus === 'Todo' ? 'In-Progress' : 
                       currentStatus === 'In-Progress' ? 'Complete' : 'Todo';
    updateTask(id, { status: nextStatus as 'Todo' | 'In-Progress' | 'Complete' });
    loadTasks();
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">📋 Todo App</h1>
        
        {/* Create Task Form */}
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

        {/* Controls */}
        <nav className="flex justify-between items-center mb-4" aria-label="Task controls">
          <menu className="space-x-2">
            <button
              onClick={() => setShowArchived(false)}
              className={`px-4 py-2 rounded ${!showArchived ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              aria-pressed={!showArchived}
            >
              Active Tasks
            </button>
            <button
              onClick={() => setShowArchived(true)}
              className={`px-4 py-2 rounded ${showArchived ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              aria-pressed={showArchived}
            >
              Archived Tasks
            </button>
          </menu>
          <form>
            <label htmlFor="sortBy" className="mr-2">Sort by:</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'topic' | 'status' | 'due_date')}
              className="border rounded p-1"
            >
              <option value="topic">Topic</option>
              <option value="status">Status</option>
              <option value="due_date">Due Date</option>
            </select>
          </form>
        </nav>

        {/* Task List */}
        <section aria-label="Task list">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No tasks found. Create one above!</p>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li key={task.id}>
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
                              onClick={() => handleStatusChange(task.id, task.status)}
                              className="bg-green-500 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
                              aria-label={`Change status of "${task.title}"`}
                            >
                              {task.status === 'Todo' ? 'Start' : 
                               task.status === 'In-Progress' ? 'Complete' : 'Reset'}
                            </button>
                            <button
                              onClick={() => handleArchive(task.id)}
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
              ))}
            </ul>
          )}
        </section>
      </section>
    </main>
  );
}