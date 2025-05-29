import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../categories';

global.fetch = jest.fn();

describe('Category API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getCategories - success', async () => {
    const mockData = [{ id: 1, name: 'Food', type: 'expense', color: '#ff0000', userId: '123' }];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await getCategories();
    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith('/api/categories');
  });

  test('getCategories - failure', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(getCategories()).rejects.toThrow('Failed to fetch categories');
  });

  test('createCategory - success', async () => {
    const newCategory = {
      name: 'Salary',
      type: 'income' as const,
      color: '#00ff00',
      userId: '123',
    };
    const mockResponse = { id: 2, ...newCategory };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await createCategory(newCategory);
    expect(data).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith('/api/categories', expect.any(Object));
  });

  test('createCategory - failure', async () => {
    const newCategory = {
      name: 'Salary',
      type: 'income' as const,
      color: '#00ff00',
      userId: '123',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(createCategory(newCategory)).rejects.toThrow('Failed to create category');
  });

  test('updateCategory - success', async () => {
    const updatedData = { name: 'Updated Name' };
    const mockResponse = { id: 1, name: 'Updated Name', type: 'expense', color: '#000', userId: '123' };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await updateCategory(1, updatedData);
    expect(data).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith('/api/categories/1', expect.any(Object));
  });

  test('updateCategory - failure', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(updateCategory(1, { name: 'Bad' })).rejects.toThrow('Failed to update category');
  });

  test('deleteCategory - success', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
    await expect(deleteCategory(1)).resolves.toBeUndefined();
    expect(fetch).toHaveBeenCalledWith('/api/categories/1', { method: 'DELETE' });
  });

  test('deleteCategory - failure', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(deleteCategory(1)).rejects.toThrow('Failed to delete category');
  });
});
