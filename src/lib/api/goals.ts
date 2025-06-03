import { Goal } from 'basics/types/goal.type';
import { config } from 'config/config';

const apiEndpoint = config.env.apiEndpoint ?? '';
const BASE_URL = `${apiEndpoint.replace(/\/$/, '')}/api/goals`;

export async function getGoals(): Promise<Goal[]> {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    throw new Error('Failed to get goals');
  }
}

export async function getGoalById(id?: string): Promise<Goal> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error();
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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    throw new Error('Failed to create goal');
  }
}

export async function updateGoal(id: string, data: Partial<Goal>): Promise<Goal> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    throw new Error('Failed to update goal');
  }
}

export async function deleteGoal(id: string): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error();
  } catch {
    throw new Error('Failed to delete goal');
  }
}
