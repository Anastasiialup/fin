// lib/api/statistics.ts
export const fetchStatistics = async (userId: number, year: number) => {
  const res = await fetch('/api/statistics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, year }),
  });
  return res.json();
};
