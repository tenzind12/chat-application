import axios from 'axios';
import {
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
} from '../type/auth.types';

export const userRegister = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await axios.post('/api/messenger/user-register', data, config);
      localStorage.setItem('authToken', response.data.token);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          message: response.data.message,
          token: response.data.token,
        },
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          error: error.response.data.error.message,
        },
      });
    }
  };
};

export const userLogin = (data) => {
  return async (dispatch) => {
    const config = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post('/api/messenger/user-login', data, config);
      localStorage.setItem('authToken', response.data.token);
      console.log(response);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          message: response.data.message,
          token: response.data.token,
        },
      });
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: {
          error: error.response.data.error.message,
        },
      });
    }
  };
};

export const userLogoutRequest = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/messenger/user-logout');
      if (response.data.success) {
        localStorage.removeItem('authToken');

        dispatch({
          type: LOGOUT_SUCCESS,
        });
      }
    } catch (error) {}
  };
};
