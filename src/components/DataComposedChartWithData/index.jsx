import DataComposedChart from '../../components/DataComposedChart'
import OneWeekNavigator from '../../components/OneWeekNavigator'
import { useState } from 'react'
import { startOfWeek, endOfWeek, addWeeks, } from 'date-fns';
import useFetch from '../../utils/hooks'

function DataComposedChartWithData() {

  const [dateRange, setDateRange] = useState({
    startDate: startOfWeek(new Date(), { weekStartsOn: 1 }), // Premier lundi de la semaine actuelle
    endDate: endOfWeek(addWeeks(new Date(), 3), { weekStartsOn: 1 }), // Dernier dimanche 4 semaines plus tard
  });

  const paramsBpm = new URLSearchParams();
  paramsBpm.append('startWeek', dateRange.startDate);
  paramsBpm.append('endWeek', dateRange.endDate);
  const { data: userActivityBpm, isLoading: isLoadingUserActivityBpm, error: errorUserActivityBpm } = useFetch(`http://localhost:8000/api/user-activity?${paramsBpm}`);
  if (errorUserActivityBpm) {
    alert("Problème lors de la récupération des données user-activity Bpm");
  }

  const [heartRateAverage, setHeartRateAverage] = useState(0);
  const handleHeartRateAverageUpdate = (value) => { setHeartRateAverage(value)};


  return (
      <>
      <div className="graphZone">
        <div className="rightGraphTitle">
          { isLoadingUserActivityBpm ? (" ") : ( heartRateAverage + " BPM")}</div>
        <OneWeekNavigator startDate={dateRange.startDate} endDate={dateRange.endDate} onDateRangeChange={setDateRange} />
        <div className="graphExplaination">Fréquence cardiaque moyenne</div>
          <div className="graph">
        { isLoadingUserActivityBpm ? (<div>Chargement en cours</div>)
        : ( 
        <>
        <DataComposedChart activityData={userActivityBpm} startDate={dateRange.startDate} endDate={dateRange.endDate} onHeartRateAverageUpdate={handleHeartRateAverageUpdate}/>
        </>
        )}
        </div>
        </div>
    </>
  )
}

export default DataComposedChartWithData
