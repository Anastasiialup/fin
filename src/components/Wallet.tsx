'use client';

import { useEffect, useState } from 'react';
import { WalletSummary } from 'basics/types/wallet.type';
import { fetchWalletSummary } from 'lib/api/wallet';

type Props = {
  userId: number;
};

const Wallet = ({ userId }: Props) => {
  const [summary, setSummary] = useState<WalletSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchWalletSummary(userId);
        setSummary(data);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [userId]);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: { error }</p>;
  if (!summary) return null;

  return (
    <div className="wallet-container">
      <h2 className="wallet-title">Гаманець</h2>
      <div className="wallet-grid">
        <form className="wallet-box">
          <label>Загальна сума</label>
          <p>{ summary.totalAmount.toFixed(2) }</p>
        </form>
        <form className="wallet-box">
          <label>Надходження</label>
          <p>{ summary.totalIncome.toFixed(2) }</p>
        </form>
        <form className="wallet-box">
          <label>Витрати</label>
          <p>{ summary.totalExpense.toFixed(2) }</p>
        </form>
        <form className="wallet-box">
          <label>Заощадження</label>
          <p>{ summary.totalSavings.toFixed(2) }</p>
        </form>
      </div>
    </div>
  );
};

export default Wallet;
