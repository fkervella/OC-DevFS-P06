import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { endOfWeek, isWithinInterval, eachWeekOfInterval, startOfWeek } from 'date-fns';
import { useState, useEffect } from 'react';

const SimpleBarChart = ( { activityData, startDate, endDate, onKmAverageUpdate } ) => {

  function transformData(jsonData, startDate, endDate) {

    const filteredData = jsonData.filter(item => {
      const itemDate = new Date(item.date);
      return isWithinInterval(itemDate, { start: startDate, end: endDate});
    });

    const weeks = eachWeekOfInterval(
      { start: startOfWeek(startDate, { weekStartsOn: 1 }), end: endOfWeek(endDate, { weekStartsOn: 1}) },
      { weekStartsOn: 1}
    );

    const result = weeks.map((weekStart, index) => {
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
    
      const weekData = filteredData.filter(item => {
        const itemDate = new Date(item.date);
        return isWithinInterval(itemDate, { start: weekStart, end: weekEnd});
      });

      const totalDistance = weekData.reduce((sum, item) => sum + item.distance, 0);

      return {
        name: `S${index + 1}`,
        km: totalDistance,
      };
    });

    return result;
  }

  const data = transformData(activityData, startDate, endDate);
  
  useEffect(() => {
    let kmAverage = 0;

    if(data.length > 0) {
      const kmSum = data.reduce((acc, entry) => acc+ entry.km, 0);
      kmAverage = Math.round(kmSum / data.length);
    }
    onKmAverageUpdate(kmAverage);
  }, [onKmAverageUpdate]);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <BarChart
      style={{ width: '100%', height: '300px', maxHeight: '300px', aspectRatio: 1.618}}
      responsive
      data={data}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CartesianGrid stroke="#f5f5f5" vertical={false} />
      <XAxis dataKey="name" tickLine={false} />
      <YAxis width="auto" tickLine={false} />
      <Legend />
      <Bar dataKey="km" barSize={20} fill={isHovered ? '#0B23F4' : '#B6BDFC'} radius={25}/>
      <RechartsDevtools />
    </BarChart>
  );
};

export default SimpleBarChart;