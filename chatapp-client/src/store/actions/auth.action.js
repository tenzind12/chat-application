import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS } from '../type/auth.types';

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
      // console.log(response);
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
