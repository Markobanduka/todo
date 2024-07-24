import { useContext, useEffect, useReducer } from "react";
import data from "../../data/users.json";
import { UserContext } from "../../App";

const LoginPage = () => {
  const userContext = useContext(UserContext);
  const { state, dispatch } = userContext;
  console.log(userContext);

  useEffect(() => {
    if (state.isLoggedIn) {
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ username: state.username, time: state.time })
      );
    }
  }, [state.isLoggedIn]);

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    const userFound = data.find(
      (item: { username: string; password: string }) =>
        item.username === state.username && item.password === state.password
    );

    if (userFound) {
      dispatch({ type: "LOGIN_SUCCESS", payload: state.username });
      setTimeout(() => dispatch({ type: "CLEAR_MESSAGE" }), 2000);
    } else {
      dispatch({ type: "LOGIN_FAILURE" });
      setTimeout(() => dispatch({ type: "CLEAR_ERROR" }), 2000);
    }
  };

  return (
    <div>
      {!state.isLoggedIn ? (
        <form onSubmit={handleSubmit}>
          <h2>Log in</h2>
          <input
            onChange={(e) =>
              dispatch({ type: "SET_USERNAME", payload: e.target.value })
            }
            type="text"
            placeholder="Enter your username"
          />
          <input
            onChange={(e) =>
              dispatch({ type: "SET_PASSWORD", payload: e.target.value })
            }
            type="password"
            placeholder="Enter your password"
          />
          <button type="submit">Log in</button>
        </form>
      ) : (
        <>
          <h2>Logged in at {state.time}!</h2>

          <div>{state.message}</div>
        </>
      )}
      {state.error && <div>Invalid credentials. Please try again.</div>}
    </div>
  );
};

export default LoginPage;
