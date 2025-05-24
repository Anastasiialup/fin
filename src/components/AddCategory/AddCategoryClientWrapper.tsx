'use client';

import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import AddCategory from './AddCategory';

type AddCategoryClientWrapperProps = {
  onCategoryCreated: () => void;
};

const AddCategoryClientWrapper = ({ onCategoryCreated }: AddCategoryClientWrapperProps) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function loadSession() {
      const session = await getSession();
      setUserId(session?.user?.id ?? null);
    }

    loadSession();
  }, []);

  if (!userId) return null;

  return <AddCategory userId={ userId } onCategoryCreated={ onCategoryCreated } />;
};

export default AddCategoryClientWrapper;
