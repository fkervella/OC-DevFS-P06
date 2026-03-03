import useFetch from '../../utils/hooks'
import StatInfo from '../../components/StatInfo';
import MemberSince from '../../components/MemberSince';
import MemberInfo from '../../components/MemberInfo';

function Profile() {

  const { data: userProfile, isLoading: isLoadingUserProfile, error: errorUserProfile } = useFetch(`http://localhost:8000/api/user-info`);
  if (errorUserProfile) {
    alert("Problème lors de la récupération des données user-info");
  }

  return (
    <div className="page">
      { isLoadingUserProfile ? (<div>Chargement en cours</div>)
      : ( 
      <>
      <div className="infos">
        <div className="whiteSpace">
          <MemberInfo userProfile={userProfile} />
        </div>
        <div className="yourProfile">
            <div className="profileTitle">Votre profil</div>
            <div className="profileInfo">Age : {userProfile.profile.age}</div>
            <div className="profileInfo">Genre : {userProfile.profile.gender}</div>
            <div className="profileInfo">Taille : {userProfile.profile.height} cm</div>
            <div className="profileInfo">Poids: {userProfile.profile.weight} kg</div>
        </div>
        <div className="stats">
            <h4>Vos statistiques</h4>
            <MemberSince date={userProfile.profile.createdAt}/>
            <div className="statsValues">
                <StatInfo label="Temps total couru" value={userProfile.statistics.totalDuration} unit="h"/>
                <StatInfo label="Calories brulées" value={userProfile.statistics.totalCalories} unit="cal"/>
                <StatInfo label="Distance totale parcourue" value={userProfile.statistics.totalDistance} unit="km"/>
                <StatInfo label="Nombre de jours de repos" value={userProfile.statistics.totalDaysOff} unit="jours"/>
                <StatInfo label="Nombre de sessions" value={userProfile.statistics.totalSessions} unit="sessions"/>
            </div>
        </div>
      </div></>
       )}
    </div>
  )
}

export default Profile
