import axios from 'axios';

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
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };
};
