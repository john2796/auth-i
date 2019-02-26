import { LOADING, SET_CURRENT_USER, GET_ERRORS } from "../action/authAction";
const isEmpty = require("is-empty");
const initialState = {
  loading: false,
  isAuthenticated: false,
  errors: {},
  user: {}
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
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };

    default:
      return state;
  }
}
