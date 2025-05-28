// lib/abi/__tests__/wallet.test.ts
import { fetchWalletSummary } from '../wallet';

describe('fetchWalletSummary', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('успішно повертає json, якщо fetch відпрацьовує з OK', async () => {
    const mockJson = { balance: 100, currency: 'USD' };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockJson),
    });

    const result = await fetchWalletSummary(123);

    expect(global.fetch).toHaveBeenCalledWith('/api/wallet/123');
    expect(result).toEqual(mockJson);
  });

  it('кидає помилку, якщо fetch повертає не OK', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(fetchWalletSummary(123)).rejects.toThrow('Failed to fetch wallet summary');
  });
});
