import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { format, isWithinInterval, parseISO } from 'date-fns';

const DataComposedChart = ( { activityData, startDate, endDate } ) => {

    function transformData(jsonData, startDate, endDate) {
  
      const filteredData = jsonData.filter(item => {
        const itemDate = new Date(item.date);
        return isWithinInterval(itemDate, { start: startDate, end: endDate});
      });
  
      const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
      const result = daysOfWeek.map(dayName => ({
        name: dayName,
        min: null,
        max: null,
        average: null,
      }));

      filteredData.forEach(item => {
        const itemDate = parseISO(item.date);
        const dayIndex = format(itemDate, 'i');
        const dayKey = daysOfWeek[dayIndex -1];

        const dayEntry = result.find (day => day.name === dayKey);
        if (dayEntry) {
          dayEntry.min = dayEntry.min === null ? item.heartRate.min : Math.min(dayEntry.min, item.heartRate.min);
          dayEntry.max = dayEntry.max === null ? item.heartRate.max : Math.max(dayEntry.max, item.heartRate.max);
          if(dayEntry.average === null) {
            dayEntry.average = item.heartRate.average;
            dayEntry.count = 1;
          } else {
            dayEntry.average = (dayEntry.average * dayEntry.count + item.heartRate.average) / (dayEntry.count + 1);
            dayEntry.count += 1;
          }
        }
      });

      return result.map(day => ({
        name: day.name,
        min: day.min !== null ? day.min: 0,
        max: day.max !== null ? day.max: 0,
        average: day.average !== null ? Math.round(day.average): 0,
      }));
    }
  
    const data = transformData(activityData, startDate, endDate);

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
      <Bar dataKey="min" barSize={20} fill="#FCC186" radius={25} />
      <Bar dataKey="max" barSize={20} fill="#F4320B" radius={25} />
      <Line type="monotone" dataKey="average" stroke="#0B23F4" />
      <RechartsDevtools />
    </ComposedChart>
  );
};

export default DataComposedChart;