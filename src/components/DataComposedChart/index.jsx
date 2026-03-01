import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

// #region Sample data
const data = [
  {
    name: 'Lun',
    minBpm: 142,
    maxBpm: 178,
    maxBpm2: 170,
  },
  {
    name: 'Mar',
    minBpm: 143,
    maxBpm: 180,
    maxBpm2: 172,
  },
  {
    name: 'Mer',
    minBpm: 145,
    maxBpm: 184,
    maxBpm2: 173,
  },
  {
    name: 'Jeu',
    minBpm: 143,
    maxBpm: 179,
    maxBpm2: 171,
  },
  {
    name: 'Ven',
    minBpm: 140,
    maxBpm: 167,
    maxBpm2: 173,
  },
  {
    name: 'Sam',
    minBpm: 146,
    maxBpm: 165,
    maxBpm2: 165,
  },
  {
    name: 'Dim',
    minBpm: 140,
    maxBpm: 178,
    maxBpm2: 170,
  },
];

// #endregion
const DataComposedChart = () => {
  return (
    <ComposedChart
      style={{ width: '100%', maxHeight: '300px', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" vertical={false} />
      <XAxis dataKey="name" scale="band" tickLine={false} />
      <YAxis width="auto" tickLine={false} />
      <Tooltip />
      <Legend />
      <Bar dataKey="minBpm" barSize={20} fill="#FCC186" radius={25} />
      <Bar dataKey="maxBpm" barSize={20} fill="#F4320B" radius={25} />
      <Line type="monotone" dataKey="maxBpm2" stroke="#0B23F4" />
      <RechartsDevtools />
    </ComposedChart>
  );
};

export default DataComposedChart;