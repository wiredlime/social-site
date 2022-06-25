import { createContext, useReducer, useEffect } from "react";
import { isValidToken } from "../utils/jwt.js";
import apiService from "../app/apiService.js";
const initialState = {
  initialized: false,
  isAuthenticated: false,
  user: null,
};
const AuthContext = createContext({ ...initialState });

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const UPDATE_PROFILE = "AUTH.UPDATE_PROFILE";
const LOGOUT = "AUTH.LOGOUT";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState); //useReducer takes in 2 arguments function reducer & state initialState

  //persistent login with side effect-----
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await apiService.get("/users/me");
          const user = response.data;
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user },
          });
        } else {
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null },
            // if !authenticated users are directed back to loginpage
          });
        }
      } catch (error) {
        console.log("Error initialize app:", error);
        dispatch({
          type: INITIALIZE,
          payload: { isAuthenticated: false, user: null },
          // if !authenticated users are directed back to loginpage
        });
      }
    };
    initialize();
  }, []);

  //action functions list--------
  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/auth/login", { email, password });
    const { user, accessToken } = response.data;
    console.log("see response post/auth/login", response.data);
    setSession(accessToken); //setSession is not a useState function
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });
    callback();
    //callback to navigate user to different page
  };

  const register = async ({ name, email, password }, callback) => {
    const response = await apiService.post("/users", { name, email, password });
    const { user, accessToken } = response.data;
    console.log("see response /user", response.data);
    setSession(accessToken); //setSession is not a useState function
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { user },
    });
    callback();
  };

  const logout = async (callback) => {
    setSession(null);
    dispatch({
      type: LOGOUT,
    });
    callback();
  };
  const x = { ...state, login: login, logout, register };
  return (
    <AuthContext.Provider value={{ ...state, logout, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
//export AuthContext to use useAuth -> easily access to states in AuthProvider.
//export AuthProvider to wraps App().
