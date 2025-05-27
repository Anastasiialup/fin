'use client';

import { FC } from 'react';
import EditFinancialRecord from './EditFinancialRecord';
import { FinancialRecord } from 'basics/types/financial-records.type';

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
