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

const FinancialRecordList: FC<FinancialRecordListProps> = ({ refreshTrigger, onEditSuccess }) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [sortColumn, setSortColumn] = useState<keyof FinancialRecord | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filters, setFilters] = useState<Partial<Record<keyof FinancialRecord, string>>>({});

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

  const handleSort = (column: keyof FinancialRecord) => {
    const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(newDirection);
  };

  const handleFilterChange = (column: keyof FinancialRecord, value: string) => {
    setFilters({ ...filters, [column]: value });
  };

  const filteredRecords = records.filter((record) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      const recordValue = String(record[key as keyof FinancialRecord] ?? '').toLowerCase();
      return recordValue.includes(value.toLowerCase());
    });
  });

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
    <div className="overflow-x-auto">
      <div className="mb-4 flex gap-4 flex-wrap">
        <input placeholder="Сума" className="border px-2 py-1" onChange={ (e) => handleFilterChange('amount', e.target.value) } />
        <input placeholder="Валюта" className="border px-2 py-1" onChange={ (e) => handleFilterChange('currency', e.target.value) } />
        <input placeholder="Тип" className="border px-2 py-1" onChange={ (e) => handleFilterChange('type', e.target.value) } />
        <input placeholder="Категорія" className="border px-2 py-1" onChange={ (e) => handleFilterChange('categoryName', e.target.value) } />
        <input placeholder="Місяць" className="border px-2 py-1" onChange={ (e) => handleFilterChange('month', e.target.value) } />
        <input placeholder="Рік" className="border px-2 py-1" onChange={ (e) => handleFilterChange('year', e.target.value) } />
      </div>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th onClick={ () => handleSort('amount') } className="cursor-pointer border px-4 py-2">Сума 🔍</th>
            <th onClick={ () => handleSort('currency') } className="cursor-pointer border px-4 py-2">Валюта 🔍</th>
            <th className="border px-4 py-2">Опис</th>
            <th onClick={ () => handleSort('type') } className="cursor-pointer border px-4 py-2">Тип 🔍</th>
            <th onClick={ () => handleSort('categoryName') } className="cursor-pointer border px-4 py-2">Категорія 🔍</th>
            <th onClick={ () => handleSort('month') } className="cursor-pointer border px-4 py-2">Місяць 🔍</th>
            <th onClick={ () => handleSort('year') } className="cursor-pointer border px-4 py-2">Рік 🔍</th>
            <th className="border px-4 py-2">Дії</th>
          </tr>
        </thead>
        <tbody>
          {
            sortedRecords.map((rec) => (
              editingId === rec.id ? (
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
                    <button className="text-blue-600 hover:underline" onClick={ () => setEditingId(rec.id) }>Редагувати</button>
                    <button className="text-red-600 hover:underline" onClick={ () => handleDelete(rec.id) }>Видалити</button>
                  </td>
                </tr>
              )
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default FinancialRecordList;
