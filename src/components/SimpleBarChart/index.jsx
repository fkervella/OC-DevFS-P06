import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

// #region Sample data
const data = [
  {
    name: 'S1',
    km: 20,
  },
  {
    name: 'S2',
    km: 27,
  },
  {
    name: 'S3',
    km: 13,
  },
  {
    name: 'S4',
    km: 32,
  },
];

// #endregion
const SimpleBarChart = () => {
  return (
    <BarChart
      style={{ width: '100%', height: '300px', maxHeight: '300px', aspectRatio: 1.618 }}
      responsive
      data={data}
    >
      <CartesianGrid stroke="#f5f5f5" vertical={false} />
      <XAxis dataKey="name" scale="band" tickLine={false} />
      <YAxis width="auto" tickLine={false} />
      <Tooltip />
      <Legend />
      <Bar dataKey="km" barSize={20} fill="#B6BDFC" radius={25}/>
      <RechartsDevtools />
    </BarChart>
  );
};

export default SimpleBarChart;