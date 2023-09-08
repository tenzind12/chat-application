import { GET_FRIENDS_SUCCESS, MESSAGE_GET_SUCCESS } from '../type/messenger.types';

const messengerState = {
  friends: [],
  message: [],
};

export const messengerReducer = (state = messengerState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FRIENDS_SUCCESS:
      return { ...state, friends: payload.friends };

    case MESSAGE_GET_SUCCESS:
      return { ...state, message: payload.message };

    default:
      return state;
  }
};
