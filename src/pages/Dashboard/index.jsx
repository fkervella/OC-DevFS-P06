import SimplePieChart from '../../components/PieChart'
import { useState } from 'react'
import { startOfWeek, endOfWeek, addWeeks, } from 'date-fns';
import useFetch from '../../utils/hooks'
import MemberInfo from '../../components/MemberInfo';
import SimpleBarChartWithData from '../../components/SimpleBarChartWithData';
import DataComposedChartWithData from '../../components/DataComposedChartWithData';


function Dashboard() {

  const { data: userProfile, isLoading: isLoadingUserProfile, error: errorUserProfile } = useFetch(`http://localhost:8000/api/user-info`);
  if (errorUserProfile) {
    alert("Problème lors de la récupération des données user-info");
  }

  return (
    <div className="page">
      { isLoadingUserProfile ? (<div>Chargement en cours</div>)
      : ( 
      <><div className="abstract">
            <MemberInfo userProfile={userProfile} />
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
                  <SimpleBarChartWithData />
                </div>
                <div className="rightGraph">
                  <DataComposedChartWithData />
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
