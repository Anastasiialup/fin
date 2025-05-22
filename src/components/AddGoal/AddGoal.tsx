'use client';

import { FC, useState } from 'react';
import { GoalStatuses } from 'basics/types/goal.type';
import { createGoal } from 'lib/api/goals';

type AddGoalPropsType = {
  userId: string;
};

const AddGoal: FC<AddGoalPropsType> = ({ userId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('UAH');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
    const newGoal = {
      name,
      description,
      price: parseFloat(price),
      currency,
      status: GoalStatuses.not_completed,
      photo: null,
      userId,
    };

    try {
      await createGoal(newGoal);
      setName('');
      setDescription('');
      setPrice('');
      setCurrency('UAH');
      alert('Ціль створено!');
    } catch {
      alert('Помилка під час створення цілі');
    }
  };

  return (
    <form
      onSubmit={ handleSubmit }
      className="max-w-md mx-auto mt-8 bg-white p-6 rounded-2xl shadow-md space-y-4 border"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Додати ціль</h2>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Назва</label>
        <input
          type="text"
          value={ name }
          onChange={ (e) => setName(e.target.value) }
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Опис</label>
        <textarea
          value={ description }
          onChange={ (e) => setDescription(e.target.value) }
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Ціна</label>
        <input
          type="number"
          value={ price }
          onChange={ (e) => setPrice(e.target.value) }
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Валюта</label>
        <select
          value={ currency }
          onChange={ (e) => setCurrency(e.target.value) }
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="UAH">₴ UAH</option>
          <option value="USD">$ USD</option>
          <option value="EUR">€ EUR</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
      >
          Зберегти ціль
      </button>
    </form>
  );
};

export default AddGoal;
