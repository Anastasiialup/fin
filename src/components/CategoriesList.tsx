'use client';

import { useEffect, useState } from 'react';
import { Category } from 'basics/types/category.type';
import { errorToast, warningToast } from 'basics/utils/toast';
import { getCategories, deleteCategory } from 'lib/api/categories';

const CategoriesList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch {
        setError('Не вдалося завантажити категорії');
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      warningToast('Категорію видалено');
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch {
      errorToast('Помилка при видаленні категорії');
    }
  };

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{ error }</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Категорії</h2>
      {
        categories.length === 0 ? (
          <p>Категорій поки немає</p>
        ) : (
          <ul className="space-y-2">
            {
              categories.map((cat) => (
                <li
                  key={ cat.id }
                  className="border p-4 rounded-lg shadow-sm relative"
                  style={ { borderLeft: `4px solid ${cat.color}` } }
                >
                  <h3 className="text-lg font-bold">{ cat.name }</h3>
                  <p className="text-sm text-gray-500">
                                        Тип: { cat.type === 'saving' ? 'Накопичення' : 'Витрати' }
                  </p>
                  <p className="text-sm text-gray-400">
                                        Дата створення: { new Date(cat.createdAt).toLocaleDateString() }
                  </p>
                  <button
                    onClick={ () => handleDelete(cat.id) }
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                  >
                                        Видалити
                  </button>
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  );
};

export default CategoriesList;
