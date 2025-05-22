import { Goal } from 'basics/types/goal.type';
import { config } from 'config/config';

const BASE_URL = `${config.env.apiEndpoint}/api/goals`;

export async function getGoals(): Promise<Goal[]> {
  try {
    const res = await fetch(BASE_URL);
    return await res.json();
  } catch {
    throw new Error('Failed to get goals');
  }
}

export async function getGoalById(id?: string): Promise<Goal> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    const response = await res.json();
    return response[0];
  } catch {
    throw new Error('Failed to get goal');
  }
}

export async function createGoal(data: Omit<Goal, 'id'>): Promise<Goal> {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    throw new Error('Failed to create goal');
  }
}

export async function updateGoal(id: string, data: Partial<Goal>): Promise<Goal> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ id, ...data }),
    });
    return await res.json();
  } catch {
    throw new Error('Failed to update goal');
  }
}

export async function deleteGoal(id: string): Promise<void> {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  } catch {
    throw new Error('Failed to delete goal');
  }
}
