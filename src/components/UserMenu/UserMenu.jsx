
import { useSelector, useDispatch } from "react-redux";
import { useLogoutUserMutation, logoutAction } from "redux/Authorization/AuthorizationAPI";
import css from "./Users.module.css"
export function UserMenu () {
  const dispatch = useDispatch()
  const [logout] = useLogoutUserMutation();
  const user = useSelector(state => state.auth.user.name)
  const logoutSave = async () => {
    await logout();
    dispatch(logoutAction());
  };

  return (
    <div className={css.userBlock}>
      <p className={css.user}>Hello, {user}</p>
      <button className={css.logoutBtn} onClick={logoutSave}>
        Logout
      </button>
    </div>
  )
}