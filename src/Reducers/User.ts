export interface UserState {
  username: string;
  password: string;
  isLoggedIn: boolean;
  error: boolean;
  message: string;
  time: string | null;
}

export interface Action {
  type: string;
  payload?: any;
}

export const initialUserData: UserState = {
  username: "",
  password: "",
  isLoggedIn: false,
  error: false,
  message: "",
  time: null,
};

export const getUsersInitialData = () => {
  const userData = localStorage.getItem("loggedInUser");
  return userData ? JSON.parse(userData) : initialUserData;
};

export const userReducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        error: false,
        message: `Welcome back ${action.payload}`,
        time: new Date().toLocaleString(),
      };
    case "LOGIN_FAILURE":
      return { ...state, error: true };
    case "CLEAR_MESSAGE":
      return { ...state, message: "" };
    case "CLEAR_ERROR":
      return { ...state, error: false };

    default:
      return state;
  }
};
