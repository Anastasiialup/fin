import { fetchFinancialRecords, createFinancialRecord, updateFinancialRecord, deleteFinancialRecord } from '../financial-records';

describe('financialRecords API', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('fetchFinancialRecords success', async () => {
    const mockData = [
      {
        id: 1,
        userId: 123,
        amount: '1000',
        currency: 'USD',
        type: 'income' as const,
        categoryId: 1,
        month: '05',
        year: 2025,
        description: 'Test income',
        attachment: null,
      },
    ];

    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response));

    const result = await fetchFinancialRecords();
    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith('/api/financial-records');
  });

  test('createFinancialRecord success', async () => {
    const newRecord = {
      userId: 123,
      amount: '1000',
      currency: 'USD',
      type: 'income' as const,
      categoryId: 1,
      month: '05',
      year: 2025,
      description: 'Test income',
      attachment: null,
    };

    const mockResponse = { id: 1, ...newRecord };

    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response));

    const result = await createFinancialRecord(newRecord);
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith('/api/financial-records', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecord),
    }));
  });

  test('updateFinancialRecord success', async () => {
    const fullRecord = {
      id: 1,
      userId: 123,
      amount: '1000',
      currency: 'USD',
      type: 'income' as const,
      categoryId: 1,
      month: '05',
      year: 2025,
      description: 'Test income',
      attachment: null,
    };

    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(fullRecord),
    } as Response));

    const result = await updateFinancialRecord(fullRecord);
    expect(result).toEqual(fullRecord);
    expect(global.fetch).toHaveBeenCalledWith(`/api/financial-records/${fullRecord.id}`, expect.objectContaining({
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullRecord),
    }));
  });

  test('deleteFinancialRecord success', async () => {
    const id = 1;

    const mockResponse = { success: true };

    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response));

    const result = await deleteFinancialRecord(id);
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(`/api/financial-records/${id}`, expect.objectContaining({
      method: 'DELETE',
    }));
  });
});
