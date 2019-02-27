import axios from "axios";
import setAuthToken from "../../utlis/setAuthToken";
import jwt_decode from "jwt-decode";

export const GET_ERRORS = "GET_ERRORS";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const LOADING = "LOADING";
export const GET_USER = "GET_USER";
export const REGISTER_USER = "REGISTER_USER";

const URL = `http://localhost:5000/api`;
const USERS = `http://localhost:5000/api/users`;
export const registerUser = (userData, history) => dispatch => {
  dispatch(setUserLoading());
  axios
    .post(`${URL}/register`, userData)
    .then(res =>
      dispatch({
        type: REGISTER_USER
      })
    )
    .then(res => history.push("/login"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data || err
      });
    });
};
export const loginUser = userData => dispatch => {
  dispatch(setUserLoading());
  axios
    .post(`${URL}/login`, userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      //jwt_decode will decode info for user
      const decoded = jwt_decode(token);
      setAuthToken(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data || err
      });
    });
};
export const getAllUser = () => dispatch => {
  dispatch(setUserLoading());
  axios
    .get(`${USERS}`)
    .then(({ data }) =>
      dispatch({
        type: GET_USER,
        data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data || err
      });
    });
};
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    decoded
  };
};
export const setUserLoading = () => {
  return {
    type: LOADING
  };
};
export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push("/login");
};
