'use client';

import { useState } from 'react';
import AddCategoryClientWrapper from 'components/AddCategory/AddCategoryClientWrapper';
import CategoriesList from 'components/CategoriesList';

export default function CategoriesPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCategoryCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Категорії</h1>
      <AddCategoryClientWrapper onCategoryCreated={ handleCategoryCreated } />
      <CategoriesList key={ refreshTrigger } />
    </main>
  );
}
