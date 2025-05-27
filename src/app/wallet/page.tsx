'use client';

import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Wallet from 'components/Wallet';

const WalletPage = () => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    async function loadSession() {
      const session = await getSession();
      setUserId(session?.user?.id ? Number(session.user.id) : null);
    }

    loadSession();
  }, []);

  if (!userId) return <p>Завантаження користувача...</p>;

  return <Wallet userId={ userId } />;
};

export default WalletPage;
