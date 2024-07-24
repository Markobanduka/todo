import { useContext } from "react";
import { UserContext } from "../App";

const Navigation = () => {
  const { state } = useContext(UserContext);
  const logoutUser = () => {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
  };

  return (
    <div>
      {state.isLoggedIn && (
        <a href="logout" onClick={logoutUser}>
          Logout
        </a>
      )}
      {!state.isLoggedIn && <a href="login">Login</a>}
    </div>
  );
};

export default Navigation;
