'use client';

import { FC, useState } from 'react';
import AddFinancialRecord from './AddFinancialRecord';

type AddFinancialRecordClientWrapperProps = {
  onFinancialRecordCreated: () => void;
};

const AddFinancialRecordClientWrapper: FC<AddFinancialRecordClientWrapperProps> = ({ onFinancialRecordCreated }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
    onFinancialRecordCreated();
  };

  return <AddFinancialRecord key={ refreshTrigger } onSuccess={ handleSuccess } />;
};

export default AddFinancialRecordClientWrapper;
