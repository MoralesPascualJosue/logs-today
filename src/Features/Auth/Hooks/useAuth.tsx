import {useAppSelector} from "../../../Store/Hooks";
import {selectCurrentUser, isLoggedUser} from "../../../Features/Auth/Store/AuthSlice";

export default function useAuth() {
  const user = useAppSelector(selectCurrentUser);
  const isLogged = useAppSelector(isLoggedUser);

  return {
    isLogged: isLogged,
    roles: user?.roles,
    user: user,
  };
}
