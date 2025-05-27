import { Category } from 'basics/types/category.type';

const BASE_URL = '/api/categories';

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  return res.json();
}

export async function createCategory(data: {
  name: string;
  type: 'income' | 'expense';
  color: string;
  userId: string;
}) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to create category');
  }
  return res.json();
}

export async function updateCategory(id: number, data: Partial<Category>): Promise<Category> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to update category');
  }
  return res.json();
}

export async function deleteCategory(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete category');
  }
}
