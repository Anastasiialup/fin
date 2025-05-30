import { FC, useEffect, useState } from 'react';
import { errorToast, successToast } from '../basics/utils/toast';
import EditFinancialRecordClientWrapper from './EditFinancialRecord/EditFinancialRecordClientWrapper';
import { FinancialRecord } from 'basics/types/financial-records.type';
import { fetchFinancialRecords, deleteFinancialRecord } from 'lib/api/financial-records';

type FinancialRecordListProps = {
  refreshTrigger: number;
  onEditSuccess: () => void;
};

type SortDirection = 'asc' | 'desc';

const Modal: FC<{ onClose: () => void; children: React.ReactNode }> = ({ onClose, children }) => (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center" onClick={ onClose }>
    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md" onClick={ (e) => e.stopPropagation() }>
      { children }
    </div>
  </div>
);

const FinancialRecordList: FC<FinancialRecordListProps> = ({ refreshTrigger, onEditSuccess }) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [sortColumn, setSortColumn] = useState<keyof FinancialRecord | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filters, setFilters] = useState<Partial<Record<keyof FinancialRecord, string>>>({});
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

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
    try {
      await deleteFinancialRecord(id);
      successToast('Запис видалено');
      onEditSuccess();
    } catch {
      errorToast('Помилка видалення запису');
    }
  };

  const handleSort = (column: keyof FinancialRecord) => {
    const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(newDirection);
  };

  const handleFilterChange = (column: keyof FinancialRecord, value: string) => {
    setFilters({ ...filters, [column]: value });
  };

  const filteredRecords = records.filter((record) => Object.entries(filters).every(([key, value]) => {
    if (!value) return true;
    const recordValue = String(record[key as keyof FinancialRecord] ?? '').toLowerCase();
    return recordValue.includes(value.toLowerCase());
  }));

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return sortDirection === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  return (
    <div className="overflow-x-auto p-4">
      <div className="mb-4 flex flex-wrap gap-3">
        {
          ['amount', 'currency', 'type', 'categoryName', 'month', 'year'].map((key) => (
            <input
              key={ key }
              placeholder={ key === 'categoryName' ? 'Категорія' : key[0].toUpperCase() + key.slice(1) }
              className="border border-gray-300 rounded px-3 py-1 shadow-sm text-sm"
              onChange={ (e) => handleFilterChange(key as keyof FinancialRecord, e.target.value) }
            />
          ))
        }
      </div>
      <table className="w-full table-auto border-collapse shadow rounded overflow-hidden">
        <thead className="bg-gray-100 text-left text-sm">
          <tr>
            {
              [
                ['amount', 'Сума'],
                ['currency', 'Валюта'],
                [null, 'Опис'],
                ['type', 'Тип'],
                ['categoryName', 'Категорія'],
                ['month', 'Місяць'],
                ['year', 'Рік'],
                [null, 'Дії'],
              ].map(([key, label], index) => (
                <th
                  key={ index }
                  className="border px-4 py-2 font-medium cursor-pointer whitespace-nowrap"
                  onClick={ () => key && handleSort(key as keyof FinancialRecord) }
                >
                  { label } { key ? '🔍' : '' }
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody className="text-sm">
          {
            sortedRecords.map((rec) => (editingId === rec.id ? (
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
              <tr key={ rec.id } className="hover:bg-gray-50 transition">
                <td className="border px-4 py-2">{ rec.amount }</td>
                <td className="border px-4 py-2">{ rec.currency }</td>
                <td className="border px-4 py-2">{ rec.description ?? '-' }</td>
                <td className="border px-4 py-2">{ rec.type }</td>
                <td className="border px-4 py-2" style={ { color: rec.categoryColor ?? 'inherit' } }>
                  { rec.categoryName ?? '-' }
                </td>
                <td className="border px-4 py-2">{ rec.month }</td>
                <td className="border px-4 py-2">{ rec.year }</td>
                <td className="border px-4 py-2 space-x-2">
                  <button className="text-blue-600 hover:underline" onClick={ () => setEditingId(rec.id) }>
                        Редагувати
                  </button>
                  <button className="text-red-600 hover:underline" onClick={ () => setConfirmDeleteId(rec.id) }>
                        Видалити
                  </button>
                </td>
              </tr>
            )))
          }
        </tbody>
      </table>

      {
        confirmDeleteId !== null && (
          <Modal onClose={ () => setConfirmDeleteId(null) }>
            <p className="mb-4 text-sm">Ви впевнені, що хочете видалити цей запис?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={
                  () => {
                    handleDelete(confirmDeleteId);
                    setConfirmDeleteId(null);
                  }
                }
              >
                  Так
              </button>
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={ () => setConfirmDeleteId(null) }
              >
                  Ні
              </button>
            </div>
          </Modal>
        )
      }
    </div>
  );
};

export default FinancialRecordList;
