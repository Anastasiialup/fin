'use client';

import { useState } from 'react';
import AddFinancialRecordClientWrapper from 'components/AddFinancialRecord/AddFinancialRecordClientWrapper';
import CurrencyConverter from 'components/CurrencyConverter'; // Імпорт конвертора валют
import FinancialRecordList from 'components/FinancialRecordList';

const FinancialRecordsPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Фінансові записи</h1>
      <AddFinancialRecordClientWrapper onFinancialRecordCreated={ () => setRefreshTrigger((prev) => prev + 1) } />
      <FinancialRecordList refreshTrigger={ refreshTrigger } onEditSuccess={ () => setRefreshTrigger((prev) => prev + 1) } />

      { /* Ось тут додаємо конвертор валют */ }
      <CurrencyConverter />
    </div>
  );
};

export default FinancialRecordsPage;
