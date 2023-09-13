import {
  GET_FRIENDS_SUCCESS,
  MESSAGE_GET_SUCCESS,
  MESSAGE_SEND_SUCCESS,
  SOCKET_MESSAGE,
} from '../type/messenger.types';

const messengerState = {
  friends: [],
  messages: [],
};

export const messengerReducer = (state = messengerState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FRIENDS_SUCCESS:
      return { ...state, friends: payload.friends };

    case MESSAGE_GET_SUCCESS:
      return { ...state, messages: payload.messages };

    case MESSAGE_SEND_SUCCESS:
    case SOCKET_MESSAGE:
      return { ...state, messages: [...state.messages, payload.messages] };

    default:
      return state;
  }
};
