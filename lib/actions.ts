'use server';
import { createTask as dbCreateTask, updateTask as dbUpdateTask, archiveTask as dbArchiveTask, Task } from './tasks';
import { revalidatePath } from 'next/cache';

export async function createTaskAction(data: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
  dbCreateTask(data);
  revalidatePath('/');
}

export async function updateTaskAction(id: number, updates: Partial<Omit<Task, 'id' | 'created_at' | 'updated_at'>>) {
  dbUpdateTask(id, updates);
  revalidatePath('/');
}

export async function archiveTaskAction(id: number) {
  dbArchiveTask(id);
  revalidatePath('/');
}