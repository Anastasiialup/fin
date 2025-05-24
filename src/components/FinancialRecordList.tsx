'use client';

import { FC, useEffect, useState } from 'react';
import { errorToast, successToast } from '../basics/utils/toast';
import EditFinancialRecordClientWrapper from './EditFinancialRecord/EditFinancialRecordClientWrapper';
import { FinancialRecord } from 'basics/types/financial-records.type';
import { fetchFinancialRecords, deleteFinancialRecord } from 'lib/api/financial-records';

type FinancialRecordListProps = {
  refreshTrigger: number;
  onEditSuccess: () => void;
};

const FinancialRecordList: FC<FinancialRecordListProps> = ({ refreshTrigger, onEditSuccess }) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    async function loadRecords() {
      try {
        const data = await fetchFinancialRecords();
        setRecords(data);
      } catch {
        errorToast('Помилка завантаження фінансових записів');
      }
    }

    loadRecords();
  }, [refreshTrigger]);

  const handleDelete = async (id: number) => {
    if (!confirm('Ви впевнені, що хочете видалити цей запис?')) return;

    try {
      await deleteFinancialRecord(id);
      successToast('Запис видалено');
      onEditSuccess();
    } catch {
      errorToast('Помилка видалення запису');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Сума</th>
            <th className="border border-gray-300 px-4 py-2">Валюта</th>
            <th className="border border-gray-300 px-4 py-2">Опис</th>
            <th className="border border-gray-300 px-4 py-2">Тип</th>
            <th className="border border-gray-300 px-4 py-2">Категорія</th>
            <th className="border border-gray-300 px-4 py-2">Місяць</th>
            <th className="border border-gray-300 px-4 py-2">Рік</th>
            <th className="border border-gray-300 px-4 py-2">Дії</th>
          </tr>
        </thead>
        <tbody>
          {
            records.map((rec) => (editingId === rec.id ? (
              <tr key={ rec.id }>
                <td colSpan={ 8 }>
                  <EditFinancialRecordClientWrapper
                    record={ rec }
                    onCancel={ () => setEditingId(null) }
                    onEditSuccess={
                      () => {
                        setEditingId(null);
                        onEditSuccess();
                      }
                    }
                  />
                </td>
              </tr>
            ) : (
              <tr key={ rec.id }>
                <td className="border border-gray-300 px-4 py-2">{ rec.amount }</td>
                <td className="border border-gray-300 px-4 py-2">{ rec.currency }</td>
                <td className="border border-gray-300 px-4 py-2">{ rec.description ?? '-' }</td>
                <td className="border border-gray-300 px-4 py-2">{ rec.type }</td>
                <td
                  className="border border-gray-300 px-4 py-2"
                  style={ { color: rec.categoryColor ?? 'inherit' } }
                >
                  { rec.categoryName ?? '-' }
                </td>
                <td className="border border-gray-300 px-4 py-2">{ rec.month }</td>
                <td className="border border-gray-300 px-4 py-2">{ rec.year }</td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={ () => setEditingId(rec.id) }
                  >
                        Редагувати
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={ () => handleDelete(rec.id) }
                  >
                        Видалити
                  </button>
                </td>
              </tr>
            )))
          }
        </tbody>
      </table>
    </div>
  );
};

export default FinancialRecordList;
