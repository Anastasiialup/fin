// components/Statistics/StatisticsChart.tsx

'use client';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

type DataPoint = {
  month: string;
  income: number;
  expense: number;
};

type Props = {
  data: DataPoint[];
};

const StatisticsChart = ({ data }: Props) => (
  <ResponsiveContainer width="100%" height={ 400 }>
    <BarChart data={ data }>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="income" fill="#82ca9d" name="Надходження" />
      <Bar dataKey="expense" fill="#8884d8" name="Витрати" />
    </BarChart>
  </ResponsiveContainer>
);

export default StatisticsChart;
