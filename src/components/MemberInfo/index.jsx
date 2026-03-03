import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

function MemberInfo({userProfile}) {

return (
    <>
    <div className="memberInfos">
        <img src={userProfile.profile.profilePicture} alt="image du profil"/>
        <div>
            <div className="memberName">{userProfile.profile.firstName} {userProfile.profile.lastName}</div>
            <div className="statsSubTitle">Membre depuis le {format(userProfile.profile.createdAt, "d MMMM yyyy", { locale: fr })}</div>
        </div>
    </div>
    </>
)
}
export default MemberInfo