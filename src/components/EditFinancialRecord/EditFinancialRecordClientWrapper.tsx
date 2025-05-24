'use client';

import { FC } from 'react';
import { FinancialRecord } from 'basics/types/financial-records.type';
import EditFinancialRecord from './EditFinancialRecord';

type EditFinancialRecordClientWrapperProps = {
  record: FinancialRecord;
  onCancel: () => void;
  onEditSuccess: () => void;
};

const EditFinancialRecordClientWrapper: FC<EditFinancialRecordClientWrapperProps> = ({
  record,
  onCancel,
  onEditSuccess,
}) => {
  return (
    <EditFinancialRecord record={ record } onCancel={ onCancel } onEditSuccess={ onEditSuccess } />
  );
};

export default EditFinancialRecordClientWrapper;
