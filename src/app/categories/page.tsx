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
    <main className="p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Категорії</h1>

      <section className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Додати категорію</h2>
        <AddCategoryClientWrapper onCategoryCreated={ handleCategoryCreated } />
      </section>

      <section className="bg-white rounded shadow p-4">
        <CategoriesList key={ refreshTrigger } />
      </section>
    </main>
  );
}
