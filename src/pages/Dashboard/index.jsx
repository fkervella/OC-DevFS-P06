import styles from './Dashboard.module.css'
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
    <div className={styles.page}>
      { isLoadingUserProfile ? (<div>Chargement en cours</div>)
      : ( 
      <><div className={styles.abstract}>
            <img src={userProfile && userProfile.profile.profilePicture} alt="image du profil" />
            <div className={styles.memberInfo}>
              <h4>{userProfile && userProfile.profile.firstName} {userProfile && userProfile.profile.lastName}</h4>
              <div className={styles.memberSince}>Membre depuis le {userProfile && userProfile.profile.createdAt}</div>
            </div>
            <div className={styles.distanceInfo}>
              <div className={styles.distanceTitle}>Distance totale parcourue</div>
              <div className={styles.distanceArea}>
                <img src="./assets/OUTLINE.png" alt="image distance parcourue" />
                <div className={styles.distance}>{userProfile && userProfile.statistics.totalDistance} km</div>
              </div>
            </div>
          </div><div className={styles.performances}>
              <h4>Vos dernières performances</h4>
              <div className={styles.graphArea}>
                <div className={styles.leftGraph}>
                  <div className={styles.leftGraphTitle}>18 km en moyenne</div>
                  <FourWeekNavigator startDate={dateRange4.startDate} endDate={dateRange4.endDate} onDateRangeChange={setDateRange4} />
                  <div className={styles.graphExplaination}>Total des kilomètres des 4 dernières semaines</div>
                  { isLoadingUserActivityKm ? (<div>Chargement en cours</div>)
                  : ( 
                  <>
                  <SimpleBarChart activityData={userActivityKm} startDate={dateRange4.startDate} endDate={dateRange4.endDate} />
                  </>
                  )}
                </div>
                <div className={styles.rightGraph}>
                  <div className={styles.rightGraphTitle}>163 BPM</div>
                  <OneWeekNavigator startDate={dateRange.startDate} endDate={dateRange.endDate} onDateRangeChange={setDateRange} />
                  <div className={styles.graphExplaination}>Fréquence cardiaque moyenne</div>
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
              <div className={styles.subTitle}>Du 23/06/2025 au 30/06/2025</div>
              <div className={styles.graphArea}>
                <div className={styles.weekRuns}>
                  <div className={styles.runResult}><span className={styles.runValue}>4X</span><span className={styles.runUnit}> sur l objectif de 6</span></div>
                  <div className={styles.activityExplaination}>Courses hebdomadaires réalisées</div>
                  <SimplePieChart />
                </div>
                <div className={styles.activityTime}>
                  <div className={styles.activityExplaination}>Durée de l activité</div>
                  <div className={styles.timeResult}><span className={styles.timeValue}>140</span><span className={styles.timeUnit}> minutes</span></div>
                </div>
                <div className={styles.activityDistance}>
                  <div className={styles.activityExplaination}>Distance</div>
                  <div className={styles.distanceResult}><span className={styles.distanceValue}>21.7</span><span className={styles.distanceUnit}> kilomètres</span></div>
                </div>
              </div>
            </div></>
       )}
    </div>
  )
}

export default Dashboard
