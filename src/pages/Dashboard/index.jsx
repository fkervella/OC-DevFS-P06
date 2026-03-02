import SimplePieChart from '../../components/PieChart'
import SimpleBarChart from '../../components/SimpleBarChart'
import DataComposedChart from '../../components/DataComposedChart'
import FourWeekNavigator from '../../components/FourWeekNavigator'
import OneWeekNavigator from '../../components/OneWeekNavigator'
import { useState } from 'react'
import { startOfWeek, endOfWeek, addWeeks, } from 'date-fns';
import useFetch from '../../utils/hooks'

function Dashboard() {

  const [dateRange, setDateRange] = useState({
    startDate: startOfWeek(new Date(), { weekStartsOn: 1 }), // Premier lundi de la semaine actuelle
    endDate: endOfWeek(addWeeks(new Date(), 3), { weekStartsOn: 1 }), // Dernier dimanche 4 semaines plus tard
  });

  const [dateRange4, setDateRange4] = useState({
    startDate: startOfWeek(new Date(), { weekStartsOn: 1 }), // Premier lundi de la semaine actuelle
    endDate: endOfWeek(addWeeks(new Date(), 3), { weekStartsOn: 1 }), // Dernier dimanche 4 semaines plus tard
  });

  const { data: userProfile, isLoading: isLoadingUserProfile, error: errorUserProfile } = useFetch(`http://localhost:8000/api/user-info`);
  if (errorUserProfile) {
    alert("Problème lors de la récupération des données user-info");
  }

  const paramsKm = new URLSearchParams();
  paramsKm.append('startWeek', dateRange4.startDate);
  paramsKm.append('endWeek', dateRange4.endDate);
  const { data: userActivityKm, isLoading: isLoadingUserActivityKm, error: errorUserActivityKm } = useFetch(`http://localhost:8000/api/user-activity?${paramsKm}`);
  if (errorUserActivityKm) {
    alert("Problème lors de la récupération des données user-activity km");
  }

  const paramsBpm = new URLSearchParams();
  paramsBpm.append('startWeek', dateRange.startDate);
  paramsBpm.append('endWeek', dateRange.endDate);
  const { data: userActivityBpm, isLoading: isLoadingUserActivityBpm, error: errorUserActivityBpm } = useFetch(`http://localhost:8000/api/user-activity?${paramsBpm}`);
  if (errorUserActivityBpm) {
    alert("Problème lors de la récupération des données user-activity Bpm");
  }
  console.log('userActivityBpm: ', userActivityBpm)

  return (
    <div className="page">
      { isLoadingUserProfile ? (<div>Chargement en cours</div>)
      : ( 
      <><div className="abstract">
            <img src={userProfile && userProfile.profile.profilePicture} alt="image du profil" />
            <div className="memberInfo">
              <h4>{userProfile && userProfile.profile.firstName} {userProfile && userProfile.profile.lastName}</h4>
              <div className="memberSince">Membre depuis le {userProfile && userProfile.profile.createdAt}</div>
            </div>
            <div className="distanceInfo">
              <div className="distanceTitle">Distance totale parcourue</div>
              <div className="distanceArea">
                <img src="./assets/OUTLINE.png" alt="image distance parcourue" />
                <div className="distance">{userProfile && userProfile.statistics.totalDistance} km</div>
              </div>
            </div>
          </div><div className="performances">
              <h4>Vos dernières performances</h4>
              <div className="graphArea">
                <div className="leftGraph">
                  <div className="leftGraphTitle">18 km en moyenne</div>
                  <FourWeekNavigator startDate={dateRange4.startDate} endDate={dateRange4.endDate} onDateRangeChange={setDateRange4} />
                  <div className="graphExplaination">Total des kilomètres des 4 dernières semaines</div>
                  { isLoadingUserActivityKm ? (<div>Chargement en cours</div>)
                  : ( 
                  <>
                  <SimpleBarChart activityData={userActivityKm} startDate={dateRange4.startDate} endDate={dateRange4.endDate} />
                  </>
                  )}
                </div>
                <div className="rightGraph">
                  <div className="rightGraphTitle">163 BPM</div>
                  <OneWeekNavigator startDate={dateRange.startDate} endDate={dateRange.endDate} onDateRangeChange={setDateRange} />
                  <div className="graphExplaination">Fréquence cardiaque moyenne</div>
                  { isLoadingUserActivityBpm ? (<div>Chargement en cours</div>)
                  : ( 
                  <>
                  <DataComposedChart activityData={userActivityBpm} startDate={dateRange.startDate} endDate={dateRange.endDate} />
                  </>
                  )}
                </div>
              </div>
            </div><div>
              <h4>Cette semaine</h4>
              <div className="subTitle">Du 23/06/2025 au 30/06/2025</div>
              <div className="graphArea">
                <div className="weekRuns">
                  <div className="runResult"><span className="runValue">4X</span><span className="runUnit"> sur l objectif de 6</span></div>
                  <div className="activityExplaination">Courses hebdomadaires réalisées</div>
                  <SimplePieChart />
                </div>
                <div className="activityTime">
                  <div className="activityExplaination">Durée de l activité</div>
                  <div className="timeResult"><span className="timeValue">140</span><span className="timeUnit"> minutes</span></div>
                </div>
                <div className="activityDistance">
                  <div className="activityExplaination">Distance</div>
                  <div className="distanceResult"><span className="distanceValue">21.7</span><span className="distanceUnit"> kilomètres</span></div>
                </div>
              </div>
            </div></>
       )}
    </div>
  )
}

export default Dashboard
