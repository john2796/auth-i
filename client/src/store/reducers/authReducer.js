import {
  LOADING,
  SET_CURRENT_USER,
  GET_ERRORS,
  GET_USER
} from "../action/authAction";
const isEmpty = require("is-empty");
const initialState = {
  loading: false,
  isAuthenticated: false,
  errors: {},
  user: {},
  users: []
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.decoded),
        user: action.decoded,
        loading: false,
        errors: {}
      };
    case GET_USER:
      return {
        ...state,
        users: action.data,
        loading: false,
        errors: {}
      };
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
