import { REGISTER_FAIL, REGISTER_SUCCESS } from '../type/auth.types';
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

export const authReducer = (state = authState, action) => {
  const { payload, type } = action;

  if (type === REGISTER_FAIL) {
    return {
      ...state,
      error: payload.error,
      authenticated: false,
      myInfo: '',
      loading: true,
    };
  }

  if (type === REGISTER_SUCCESS) {
    const myInfo = tokenDecoded(payload.token);
    return {
      ...state,
      myInfo,
      successMessage: payload.message,
      error: '',
      authenticated: true,
      loading: false,
    };
  }

  return state;
};
