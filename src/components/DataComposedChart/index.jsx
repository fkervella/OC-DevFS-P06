import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { format, isWithinInterval, parseISO } from 'date-fns';
import { useState, useEffect } from 'react';

const DataComposedChart = ( { activityData, startDate, endDate, onHeartRateAverageUpdate } ) => {

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
    
    useEffect(() => {
      const filteredValidValues = data.filter(entry => entry.average > 0 );

      let heartRateAverage = 0 ;

      if(filteredValidValues.length > 0) {
        const heartRateSum = filteredValidValues.reduce((acc, entry) => acc+ entry.average, 0);
        heartRateAverage = Math.round(heartRateSum / filteredValidValues.length);
      }

      onHeartRateAverageUpdate(heartRateAverage);
    }, [onHeartRateAverageUpdate]);
    
    const [isHovered, setIsHovered] = useState(false);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CartesianGrid stroke="#f5f5f5" vertical={false} />
      <XAxis dataKey="name" tickLine={false} />
      <YAxis width="auto" tickLine={false} />
      <Tooltip />
      <Legend />
      <Bar dataKey="min" barSize={20} fill="#FCC186" radius={25} />
      <Bar dataKey="max" barSize={20} fill="#F4320B" radius={25} />
      <Line type="monotone" dataKey="average" dot={true} stroke={isHovered ? '#0B23F4' : '#B6BDFC'} strokeWidth={3}/>
      <RechartsDevtools />
    </ComposedChart>
  );
};

export default DataComposedChart;