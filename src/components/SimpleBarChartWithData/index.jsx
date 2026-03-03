import SimpleBarChart from '../../components/SimpleBarChart'
import FourWeekNavigator from '../../components/FourWeekNavigator'
import { useState } from 'react'
import { startOfWeek, endOfWeek, addWeeks, } from 'date-fns';
import useFetch from '../../utils/hooks'

function SimpleBarChartWithData() {

  const [dateRange4, setDateRange4] = useState({
    startDate: startOfWeek(new Date(), { weekStartsOn: 1 }), // Premier lundi de la semaine actuelle
    endDate: endOfWeek(addWeeks(new Date(), 3), { weekStartsOn: 1 }), // Dernier dimanche 4 semaines plus tard
  });

  const paramsKm = new URLSearchParams();
  paramsKm.append('startWeek', dateRange4.startDate);
  paramsKm.append('endWeek', dateRange4.endDate);
  const { data: userActivityKm, isLoading: isLoadingUserActivityKm, error: errorUserActivityKm } = useFetch(`http://localhost:8000/api/user-activity?${paramsKm}`);
  if (errorUserActivityKm) {
    alert("Problème lors de la récupération des données user-activity km");
  }

  return (
    <>
      <div className="leftGraphTitle">18 km en moyenne</div>
      <FourWeekNavigator startDate={dateRange4.startDate} endDate={dateRange4.endDate} onDateRangeChange={setDateRange4} />
      <div className="graphExplaination">Total des kilomètres des 4 dernières semaines</div>
      { isLoadingUserActivityKm ? (<div>Chargement en cours</div>)
      : ( 
      <>
      <SimpleBarChart activityData={userActivityKm} startDate={dateRange4.startDate} endDate={dateRange4.endDate} />
      </>
      )}
    </>
  )
}

export default SimpleBarChartWithData
