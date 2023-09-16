import axios from 'axios';
import {
  GET_FRIENDS_SUCCESS,
  MESSAGE_GET_SUCCESS,
  MESSAGE_SEND_SUCCESS,
} from '../type/messenger.types';

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
      dispatch({
        type: MESSAGE_SEND_SUCCESS,
        payload: { messages: response.data.message },
      });
    } catch (error) {
      console.log('sendMessage', error);
    }
  };
};

// requesting single friends convo
export const requestGetMessage = (currentFriendId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/messenger/get-message/${currentFriendId}`);
      dispatch({
        type: MESSAGE_GET_SUCCESS,
        payload: { messages: response.data.message },
      });
    } catch (error) {
      console.log('requestGetMessage', error);
    }
  };
};

// sending image request
export const requestSendImage = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/messenger/send-image', data);
      dispatch({
        type: MESSAGE_SEND_SUCCESS,
        payload: { messages: response.data.message },
      });
    } catch (error) {
      console.log('requestSendImage', error);
    }
  };
};

export const seenMessageRequest = (message) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/messenger/seen-message', message);
      console.log(response);
    } catch (error) {
      console.log('seenMessageRequest ', error);
    }
  };
};

export const deliveredMessageRequest = (message) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/messenger/delivered-message', message);
      console.log(response);
    } catch (error) {
      console.log('seenMessageRequest ', error);
    }
  };
};
