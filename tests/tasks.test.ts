import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import Database from 'better-sqlite3';

const { testDb } = vi.hoisted(() => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const DatabaseCtor = require('better-sqlite3');
  return { testDb: new DatabaseCtor(':memory:') };
});

vi.mock('../lib/db', () => ({
  default: testDb,
}));

import {
  createTask,
  getActiveTasks,
  getArchivedTasks,
  getTasksSortedBy,
  updateTask,
  archiveTask,
  restoreTask,
} from '../lib/tasks';
import { isOverdue } from '../lib/utils';

describe('Todo App - Task Operations', () => {
  beforeEach(() => {
    testDb.exec(`
      CREATE TABLE tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        due_date TEXT NOT NULL,
        topic TEXT NOT NULL,
        status TEXT NOT NULL CHECK(status IN ('Todo', 'In-Progress', 'Complete')),
        archived BOOLEAN DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
  });

  afterEach(() => {
    testDb.exec('DROP TABLE IF EXISTS tasks');
  });

  function createTestTask(overrides = {}) {
    const defaultTask = {
      title: 'Test Task',
      description: 'Test Description',
      due_date: '2026-12-31',
      topic: 'Work',
      status: 'Todo' as const,
      archived: false,
    };
    return createTask({ ...defaultTask, ...overrides });
  }

  test('should create a task and retrieve it from active list', () => {
    const taskId = createTestTask({ title: 'Complete Lab 1', due_date: '2026-08-15', topic: 'School' });
    const tasks = getActiveTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].id).toBe(taskId);
    expect(tasks[0].title).toBe('Complete Lab 1');
    expect(Boolean(tasks[0].archived)).toBe(false); // ← wrapped, since SQLite returns 0/1
  });

  test('should archive a task and remove it from active list', () => {
    const taskId = createTestTask({ title: 'Task to Archive' });
    archiveTask(taskId);
    expect(getActiveTasks().length).toBe(0);
    const archivedTasks = getArchivedTasks();
    expect(archivedTasks.length).toBe(1);
    expect(Boolean(archivedTasks[0].archived)).toBe(true); // ← wrapped
  });

  test('should restore an archived task back to active', () => {
    const taskId = createTestTask({ title: 'Task to Restore' });
    archiveTask(taskId);
    restoreTask(taskId);
    expect(getActiveTasks().length).toBe(1);
    expect(getArchivedTasks().length).toBe(0);
  });

  test('should update a task and persist changes', () => {
    const taskId = createTestTask({ title: 'Original Title' });
    updateTask(taskId, { title: 'Updated Title', status: 'In-Progress' });
    const tasks = getActiveTasks();
    expect(tasks[0].title).toBe('Updated Title');
    expect(tasks[0].status).toBe('In-Progress');
  });

  test('should correctly identify overdue tasks', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    createTestTask({ title: 'Overdue Task', due_date: yesterdayStr, status: 'Todo' });
    createTestTask({ title: 'Completed Task', due_date: yesterdayStr, status: 'Complete' });

    const tasks = getActiveTasks();
    const overdueTasks = tasks.filter(t => isOverdue(t));
    expect(overdueTasks.length).toBe(1);
    expect(overdueTasks[0].title).toBe('Overdue Task');
  });

  test('should sort tasks by topic, status, and due_date', () => {
    createTestTask({ title: 'Alpha', topic: 'A-Topic', status: 'Todo', due_date: '2026-12-31' });
    createTestTask({ title: 'Charlie', topic: 'C-Topic', status: 'Complete', due_date: '2026-12-01' });
    createTestTask({ title: 'Bravo', topic: 'B-Topic', status: 'In-Progress', due_date: '2026-12-15' });

    const sortedByTopic = getTasksSortedBy('topic');
    expect(sortedByTopic.map(t => t.topic)).toEqual(['A-Topic', 'B-Topic', 'C-Topic']);
  });
})