// components/Statistics/StatisticsClientWrapper.tsx

'use client';

import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { fetchStatistics } from '../../lib/api/statistics';
import StatisticsChart from './StatisticsChart';

const StatisticsClientWrapper = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadSession = async () => {
      const session = await getSession();
      setUserId(session?.user?.id ? Number(session.user.id) : null);
    };
    loadSession();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchStatistics(userId, year).then(setData);
    }
  }, [userId, year]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(e.target.value));
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="year" className="mr-2">Оберіть рік:</label>
        <select id="year" value={ year } onChange={ handleYearChange }>
          {
            [...Array(5)].map((_, i) => {
              const y = new Date().getFullYear() - i;
              return <option key={ y } value={ y }>{ y }</option>;
            })
          }
        </select>
      </div>
      <StatisticsChart data={ data } />
    </div>
  );
};

export default StatisticsClientWrapper;
