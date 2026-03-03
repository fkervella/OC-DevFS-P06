import { Pie, PieChart, Tooltip } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

// #region Sample data
const data02 = [
    { name: '2 restants', value: 2, fill: "#B6BDFC", label: '2 restants' }, 
    { name: '4 réalisés', value: 4, fill: "#0B23F4", label: '4 réalisés' },
];

// #endregion
export default function SimplePieChart({isAnimationActive = true,defaultIndex}) {
    return (
        <PieChart
            style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
            responsive
            >
        <Pie
            data={data02}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="80%"
            fill="#0B23F4"
            label
            isAnimationActive={isAnimationActive}
            />
            
        <Tooltip defaultIndex={defaultIndex} />
        <RechartsDevtools />
        </PieChart>
    );
}