'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Goal, GoalStatuses } from 'basics/types/goal.type';
import { errorToast, warningToast, successToast } from 'basics/utils/toast';
import { getGoals, deleteGoal, updateGoal } from 'lib/api/goals';

const GoalsList = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await getGoals();
        setGoals(data);
      } catch {
        setError('Не вдалося завантажити цілі');
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteGoal(id);
      warningToast('Ціль було успішно видалено');
      setGoals((prev) => prev.filter((goal) => goal.id !== id));
    } catch {
      errorToast('Помилка під час видалення цілі');
    }
  };

  const handleComplete = async (id: string) => {
    try {
      const updated = await updateGoal(id, { status: GoalStatuses.achieved });
      setGoals((prev) => prev.map((goal) => (goal.id === id ? updated : goal)));
      successToast('Ціль досягнута!');
    } catch {
      errorToast('Не вдалося оновити статус цілі');
    }
  };

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{ error }</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Мої цілі</h2>
      {
        goals.length === 0 ? (
          <p>Цілей поки немає</p>
        ) : (
          <ul className="space-y-2">
            {
              goals.map((goal) => (
                <li
                  key={ goal.id }
                  className="border p-4 rounded-lg shadow-sm flex items-center gap-4"
                >
                  <Image
                    src={
                      goal.photo
                            || `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/goals/default.png`
                    }
                    alt={ goal.name }
                    width={ 64 }
                    height={ 64 }
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{ goal.name }</h3>
                    <p className="text-gray-600">{ goal.description }</p>
                    <p className="text-sm text-gray-500">
                      { goal.price } { goal.currency }
                    </p>
                    <p className="text-sm text-gray-400">
                        Статус: { goal.status === GoalStatuses.achieved ? 'Досягнута' : 'Не завершена' }
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {
                      goal.status !== GoalStatuses.achieved && (
                        <button
                          onClick={ () => handleComplete(goal.id) }
                          className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                            Завершити
                        </button>
                      )
                    }
                    <button
                      onClick={ () => handleDelete(goal.id) }
                      className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                        Видалити
                    </button>
                  </div>
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  );
};

export default GoalsList;
