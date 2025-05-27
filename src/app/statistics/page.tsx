// app/statistics/page.tsx
import StatisticsClientWrapper from '../../components/Statistics/StatisticsClientWrapper';

const StatisticsPage = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Статистика</h1>
    <StatisticsClientWrapper />
  </div>
);

export default StatisticsPage;
