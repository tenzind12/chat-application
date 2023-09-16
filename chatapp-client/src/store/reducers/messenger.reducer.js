import {
  DELIVERED_MESSAGE,
  GET_FRIENDS_SUCCESS,
  MESSAGE_GET_SUCCESS,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_SUCCESS_CLEAR,
  SEEN_MESSAGE,
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
      const updateIndex = state.friends.findIndex(
        (friend) =>
          friend.friendInfo._id === payload.messageInfo.receiverId ||
          friend.friendInfo._id === payload.messageInfo.senderId
      );
      state.friends[updateIndex].messageInfo = payload.messageInfo;
      state.friends[updateIndex].messageInfo.status = payload.status;

      return state;

    case SEEN_MESSAGE:
      const seenIndex = state.friends.findIndex(
        (friend) =>
          friend.friendInfo._id === payload.messageInfo.receiverId ||
          friend.friendInfo._id === payload.messageInfo.senderId
      );

      state.friends[seenIndex].messageInfo.status = 'seen';
      return { ...state };

    case DELIVERED_MESSAGE:
      const deliveredIndex = state.friends.findIndex(
        (friend) =>
          friend.friendInfo._id === payload.messageInfo.receiverId ||
          friend.friendInfo._id === payload.messageInfo.senderId
      );

      state.friends[deliveredIndex].messageInfo.status = payload.status;
      return { ...state };

    default:
      return state;
  }
};
