import { Goal } from 'basics/types/goal.type';

const BASE_URL = '/api/goals';

export async function getGoals(): Promise<Goal[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to get goals');
  return res.json();
}

export async function getGoalById(id?: string): Promise<Goal> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to get goal');
  const data = await res.json();
  return data[0];
}

export async function createGoal(data: Omit<Goal, 'id'>): Promise<Goal> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create goal');
  return res.json();
}

export async function updateGoal(id: string, data: Partial<Goal>): Promise<Goal> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update goal');
  return res.json();
}

export async function deleteGoal(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete goal');
}
