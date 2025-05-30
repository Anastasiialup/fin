'use client';

import { FC, useState } from 'react';
import { successToast, errorToast } from '../../basics/utils/toast';
import { createCategory } from 'lib/api/categories';

type AddCategoryPropsType = {
  userId: string;
  onCategoryCreated: () => void;
};

const AddCategory: FC<AddCategoryPropsType> = ({ userId, onCategoryCreated }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [color, setColor] = useState('#000000');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newCategory = {
      name,
      type,
      color,
      userId,
    };

    try {
      await createCategory(newCategory);
      setName('');
      setType('expense');
      setColor('#000000');
      successToast('Категорію створено!');
      onCategoryCreated();
    } catch {
      errorToast('Помилка під час створення категорії');
    }
  };

  return (
    <form
      onSubmit={ handleSubmit }
      className="max-w-md mx-auto mt-8 bg-white p-6 rounded-2xl shadow-md space-y-4 border"
    >

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
        <label className="block text-gray-700 font-medium mb-1">Тип</label>
        <select
          value={ type }
          onChange={ (e) => setType(e.target.value as 'income' | 'expense') }
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="income">Дохід</option>
          <option value="expense">Витрата</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Колір</label>
        <input
          type="color"
          value={ color }
          onChange={ (e) => setColor(e.target.value) }
          className="w-full h-10 px-2 border border-gray-300 rounded-xl cursor-pointer"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
      >
                Зберегти категорію
      </button>
    </form>
  );
};

export default AddCategory;
