'use client';

import { useEffect, useState } from 'react';
import { Goal, GoalStatuses } from 'basics/types/goal.type';
import { errorToast, warningToast } from 'basics/utils/toast';
import { getGoals, deleteGoal, updateGoal } from 'lib/api/goals';

const GoalsList = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGoals() {
      try {
        const data = await getGoals();
        setGoals(data);
      } catch {
        setError('Не вдалося завантажити цілі');
      } finally {
        setLoading(false);
      }
    }

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
                <li key={ goal.id } className="border p-4 rounded-lg shadow-sm relative">
                  <h3 className="text-lg font-bold">{ goal.name }</h3>
                  { goal.description && <p>{ goal.description }</p> }
                  <p
                    className={
                      `text-sm ${
                        goal.status === GoalStatuses.achieved ? 'text-green-600' : 'text-orange-600'
                      }`
                    }
                  >
                          Статус: { goal.status === GoalStatuses.achieved ? 'Досягнута' : 'Не завершена' }
                  </p>
                  {
                    goal.price && (
                      <p className="text-sm text-gray-400">Ціна: { goal.price }</p>
                    )
                  }

                  {
                    goal.status !== GoalStatuses.achieved && (
                      <button
                        onClick={ () => handleComplete(goal.id) }
                        className="mt-2 text-sm text-blue-600 hover:underline"
                      >
                              Позначити як виконану
                      </button>
                    )
                  }

                  <button
                    onClick={ () => handleDelete(goal.id) }
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

export default GoalsList;
