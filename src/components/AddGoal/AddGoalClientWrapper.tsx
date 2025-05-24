'use client';

import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import AddGoal from './AddGoal';

type AddGoalClientWrapperProps = {
  onGoalCreated: () => void;
};

const AddGoalClientWrapper = ({ onGoalCreated }: AddGoalClientWrapperProps) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function loadSession() {
      const session = await getSession();
      setUserId(session?.user?.id ?? null);
    }

    loadSession();
  }, []);

  if (!userId) return null;

  return <AddGoal userId={ userId } onGoalCreated={ onGoalCreated } />;
};

export default AddGoalClientWrapper;
