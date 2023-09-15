import {
  GET_FRIENDS_SUCCESS,
  MESSAGE_GET_SUCCESS,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_SUCCESS_CLEAR,
  SOCKET_MESSAGE,
  UPDATE_FRIEND_MESSAGE,
} from '../type/messenger.types';

const messengerState = {
  friends: [],
  messages: [],
  messageSendSuccess: false,
};

export const messengerReducer = (state = messengerState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: payload.friends,
      };

    case MESSAGE_GET_SUCCESS:
      return {
        ...state,
        messages: payload.messages,
      };

    case MESSAGE_SEND_SUCCESS:
      return {
        ...state,
        messageSendSuccess: true,
        messages: [...state.messages, payload.messages],
      };

    case MESSAGE_SEND_SUCCESS_CLEAR:
      return {
        ...state,
        messageSendSuccess: false,
      };

    case SOCKET_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload.messages],
      };

    case UPDATE_FRIEND_MESSAGE:
      const index = state.friends.findIndex(
        (friend) =>
          friend.friendInfo._id === payload.messageInfo.receiverId ||
          friend.friendInfo._id === payload.messageInfo.senderId
      );

      state.friends[index].messageInfo = payload.messageInfo;
      return state;

    default:
      return state;
  }
};
