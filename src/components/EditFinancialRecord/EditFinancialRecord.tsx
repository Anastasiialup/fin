'use client';

import { FC, useEffect, useState } from 'react';
import { errorToast, successToast } from '../../basics/utils/toast';
import { FinancialRecord } from 'basics/types/financial-records.type';
import { updateFinancialRecord } from 'lib/api/financial-records';

type EditFinancialRecordProps = {
  record: FinancialRecord;
  onCancel: () => void;
  onEditSuccess: () => void;
};

type CategoryOption = {
  id: number;
  name: string;
  color: string;
};

const EditFinancialRecord: FC<EditFinancialRecordProps> = ({ record, onCancel, onEditSuccess }) => {
  const [amount, setAmount] = useState(record.amount);
  const [currency, setCurrency] = useState(record.currency);
  const [description, setDescription] = useState(record.description ?? '');
  const [type, setType] = useState<'income' | 'expense'>(record.type);
  const [categoryId, setCategoryId] = useState<number | null>(record.categoryId ?? null);
  const [month, setMonth] = useState(record.month);
  const [year, setYear] = useState(record.year);
  const [categories, setCategories] = useState<CategoryOption[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error('Помилка завантаження категорій');
        const data = await res.json();
        setCategories(data);
      } catch {
        errorToast('Не вдалося завантажити категорії');
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !currency || !type || !month || !year) {
      errorToast('Будь ласка, заповніть обов’язкові поля');
      return;
    }

    try {
      await updateFinancialRecord({
        id: record.id,
        userId: record.userId,
        amount,
        currency,
        description,
        type,
        categoryId,
        month,
        year,
        attachment: record.attachment ?? null,
      });
      successToast('Фінансовий запис оновлено');
      onEditSuccess();
    } catch {
      errorToast('Помилка оновлення фінансового запису');
    }
  };

  return (
    <form onSubmit={ handleSubmit } className="space-y-4 p-4 border border-gray-300 rounded">
      <div>
        <label className="block mb-1">Сума *</label>
        <input
          type="number"
          step="0.01"
          value={ amount }
          onChange={ (e) => setAmount(e.target.value) }
          required
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      <div>
        <label className="block mb-1">Валюта *</label>
        <input
          type="text"
          value={ currency }
          onChange={ (e) => setCurrency(e.target.value) }
          required
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      <div>
        <label className="block mb-1">Опис</label>
        <textarea
          value={ description }
          onChange={ (e) => setDescription(e.target.value) }
          className="border rounded px-2 py-1 w-full"
          rows={ 3 }
        />
      </div>
      <div>
        <label className="block mb-1">Тип *</label>
        <select
          value={ type }
          onChange={ (e) => setType(e.target.value as 'income' | 'expense') }
          required
          className="border rounded px-2 py-1 w-full"
        >
          <option value="income">Дохід</option>
          <option value="expense">Витрата</option>
        </select>
      </div>
      <div>
        <label className="block mb-1">Категорія</label>
        <select
          value={ categoryId ?? '' }
          onChange={ (e) => setCategoryId(e.target.value ? Number(e.target.value) : null) }
          className="border rounded px-2 py-1 w-full"
        >
          <option value="">Без категорії</option>
          {
            categories.map((cat) => (
              <option key={ cat.id } value={ cat.id } style={ { color: cat.color } }>
                { cat.name }
              </option>
            ))
          }
        </select>
      </div>
      <div>
        <label className="block mb-1">Місяць *</label>
        <input
          type="text"
          value={ month }
          onChange={ (e) => setMonth(e.target.value) }
          placeholder="Наприклад: Січень"
          required
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      <div>
        <label className="block mb-1">Рік *</label>
        <input
          type="number"
          value={ year }
          onChange={ (e) => setYear(Number(e.target.value)) }
          required
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      <div className="space-x-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
            Зберегти
        </button>
        <button
          type="button"
          onClick={ onCancel }
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
            Скасувати
        </button>
      </div>
    </form>
  );
};

export default EditFinancialRecord;
