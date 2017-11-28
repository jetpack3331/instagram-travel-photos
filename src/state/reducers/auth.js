import { LOGIN, LOGOUT } from '../constants/auth';

let authData = window.localStorage.getItem('auth');
if (authData) {
  authData = JSON.parse(authData);
}

// @todo: validate token and in that case remove auth data if token is expired
const initialState = {
  logged: authData && !!authData.token,
  token: authData && authData.token ? authData.token : null,
  data: authData ? authData : {},
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case LOGOUT:
      window.localStorage.removeItem('auth');

      return {
        ...state,
        logged: false,
      };
    case LOGIN:
      // @TODO: deal with login and saving multiple tokens (FB, normal login, etc.)
      // window.localStorage.setItem(authKey, JSON.stringify());

      return {
        ...state,
        logged: true,
        token: action.payload.token,
        data: action.payload,
      };
    default:
      return state;
  }
}
