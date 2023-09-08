import axios from 'axios';
import { GET_FRIENDS_SUCCESS } from '../type/messenger.types';

export const requestFriends = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/messenger/get-friends');
      dispatch({
        type: GET_FRIENDS_SUCCESS,
        payload: {
          friends: response.data.friends,
        },
      });
    } catch (error) {
      console.log('getFriends', error);
    }
  };
};

export const requestSendMessage = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/messenger/send-message', data);
      console.log(response);
    } catch (error) {
      console.log('sendMessage', error);
    }
  };
};
