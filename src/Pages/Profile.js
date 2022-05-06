import { useContext } from "react";
import StakeholderCard from "../Components/Cards/Stakeholder";
import { AuthContext } from "../Services/Contexts/AuthContext";

const Profile = () => {
  const { authState } = useContext(AuthContext);
  return (
    <div className="mt-2 d-flex justify-content-center">
      <StakeholderCard id={authState.stakeholder.id} />
    </div>
  )
}
export default Profile;