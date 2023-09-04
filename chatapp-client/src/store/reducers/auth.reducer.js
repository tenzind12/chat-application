import {
  ERROR_MESSAGE_CLEAR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SUCCESS_MESSAGE_CLEAR,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
} from '../type/auth.types';
import jwt_decode from 'jwt-decode';

const authState = {
  loading: true,
  authenticated: false,
  error: '',
  successMessage: '',
  myInfo: '',
};

const tokenDecoded = (token) => {
  const userInfo = jwt_decode(token);
  const expiredTime = new Date(userInfo.exp * 1000);
  if (new Date() > expiredTime) {
    return null;
  } else {
    return userInfo;
  }
};

const getTokenFromLocalStorage = localStorage.getItem('authToken');
if (getTokenFromLocalStorage) {
  // current user info
  const getMyInfo = tokenDecoded(getTokenFromLocalStorage);
  if (getMyInfo) {
    authState.myInfo = getMyInfo;
    authState.authenticated = true;
    authState.loading = false;
  }
}

export const authReducer = (state = authState, action) => {
  const { payload, type } = action;

  switch (type) {
    case REGISTER_FAIL:
    case USER_LOGIN_FAIL:
      return {
        ...state,
        error: payload.error,
        authenticated: false,
        myInfo: '',
        loading: true,
      };

    case REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
      const myInfo = tokenDecoded(payload.token);
      return {
        ...state,
        myInfo,
        successMessage: payload.message,
        error: '',
        authenticated: true,
        loading: false,
      };

    case SUCCESS_MESSAGE_CLEAR:
      return {
        ...state,
        successMessage: '',
      };

    case ERROR_MESSAGE_CLEAR:
      return {
        ...state,
        error: '',
      };

    default:
      return state;
  }
};
