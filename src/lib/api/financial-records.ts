import { FinancialRecord, NewFinancialRecord } from 'basics/types/financial-records.type';

export async function fetchFinancialRecords(): Promise<FinancialRecord[]> {
  const res = await fetch('/api/financial-records');
  if (!res.ok) throw new Error('Failed to fetch financial records');
  return res.json();
}

export async function createFinancialRecord(record: NewFinancialRecord): Promise<FinancialRecord> {
  const res = await fetch('/api/financial-records', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  });
  if (!res.ok) throw new Error('Failed to create financial record');
  return res.json();
}

export async function updateFinancialRecord(record: FinancialRecord): Promise<FinancialRecord> {
  const res = await fetch(`/api/financial-records/${record.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  });
  if (!res.ok) throw new Error('Failed to update financial record');
  return res.json();
}

export async function deleteFinancialRecord(id: number): Promise<FinancialRecord> {
  const res = await fetch(`/api/financial-records/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete financial record');
  return res.json();
}
