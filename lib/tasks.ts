import db from './db';

// Task type definition
export interface Task {
  id: number;
  title: string;
  description: string | null;
  due_date: string;
  topic: string;
  status: 'Todo' | 'In-Progress' | 'Complete';
  archived: boolean;
  created_at: string;
  updated_at: string;
}

// Create a new task
export function createTask(
  task: Omit<Task, 'id' | 'created_at' | 'updated_at'>
): number {
  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, due_date, topic, status, archived)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(
    task.title,
    task.description,
    task.due_date,
    task.topic,
    task.status,
    false
  );
  
  return Number(result.lastInsertRowid);
}


// Get all active tasks (i.e the ones that are not archived)
export function getActiveTasks(): Task[] {
  const stmt = db.prepare('SELECT * FROM tasks WHERE archived = 0 ORDER BY created_at DESC');
  return stmt.all() as Task[];
}

// Get all archived tasks
export function getArchivedTasks(): Task[] {
  const stmt = db.prepare('SELECT * FROM tasks WHERE archived = 1 ORDER BY created_at DESC');
  return stmt.all() as Task[];
}

// Get tasks sorted by a field
export function getTasksSortedBy(sortBy: 'topic' | 'status' | 'due_date'): Task[] {
  const stmt = db.prepare(`SELECT * FROM tasks WHERE archived = 0 ORDER BY ${sortBy} ASC`);
  return stmt.all() as Task[];
}

// Update a task
export function updateTask(id: number, updates: Partial<Omit<Task, 'id' | 'created_at' | 'updated_at'>>): void {
  const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
  const values : (string | number | boolean | null)[] = Object.values(updates);
  values.push(id);
  
  const stmt = db.prepare(`UPDATE tasks SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`);
  stmt.run(...values);
}

// Archive a task
export function archiveTask(id: number): void {
  const stmt = db.prepare('UPDATE tasks SET archived = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
  stmt.run(id);
}

// Check if a task is overdue (DERIVED, not stored!)
export function isOverdue(task: Task): boolean {
  if (task.status === 'Complete') return false;
  return new Date(task.due_date) < new Date();
}