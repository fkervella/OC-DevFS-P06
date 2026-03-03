import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

function MemberSince({date}) {

return (
    <>
        <div className="statsSubTitle">depuis le {format(date, "d MMMM yyyy", { locale: fr })}</div>
    </>
)
}

export default MemberSince
