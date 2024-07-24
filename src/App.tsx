import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/pages/LoginPage";
import HomePage from "./Components/pages/HomePage";
import Navigation from "./Partials/Navigation";
import { createContext, useReducer } from "react";
import {
  getUsersInitialData,
  userReducer,
  UserState,
  Action,
} from "./Reducers/User";

interface UserContextProps {
  state: UserState;
  dispatch: React.Dispatch<Action>;
}

export const UserContext = createContext<UserContextProps>({
  state: getUsersInitialData(),
  dispatch: () => null,
});

const App = () => {
  const [state, dispatch] = useReducer(userReducer, getUsersInitialData());

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
