import { Category } from 'basics/types/category.type';
import { config } from 'config/config';

const BASE_URL = `${config.env.apiEndpoint}/api/categories`;

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(BASE_URL);
    return await res.json();
  } catch {
    throw new Error('Failed to get categories');
  }
}

export async function createCategory(data: Omit<Category, 'id' | 'createdAt'>): Promise<Category> {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    throw new Error('Failed to create category');
  }
}

export async function updateCategory(id: number, data: Partial<Category>): Promise<Category> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    throw new Error('Failed to update category');
  }
}

export async function deleteCategory(id: number): Promise<void> {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  } catch {
    throw new Error('Failed to delete category');
  }
}
