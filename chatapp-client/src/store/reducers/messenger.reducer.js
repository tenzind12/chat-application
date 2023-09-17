import {
  DELIVERED_MESSAGE,
  GET_FRIENDS_SUCCESS,
  MESSAGE_GET_SUCCESS,
  MESSAGE_GET_SUCCESS_CLEAR,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_SUCCESS_CLEAR,
  SEEN_ALL,
  SEEN_MESSAGE,
  SOCKET_MESSAGE,
  UPDATE_CURRENT_FRIEND_MESSAGE,
  UPDATE_FRIEND_MESSAGE,
} from '../type/messenger.types';

const messengerState = {
  friends: [],
  messages: [],
  messageSendSuccess: false,
  messageGetSuccess: false,
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
        messageGetSuccess: true,
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
      const updateFrndMsg = state.friends.findIndex(
        (friend) =>
          friend.friendInfo._id === payload.messageInfo.receiverId ||
          friend.friendInfo._id === payload.messageInfo.senderId
      );
      state.friends[updateFrndMsg].messageInfo = payload.messageInfo;
      state.friends[updateFrndMsg].messageInfo.status = payload.status;

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

    case UPDATE_CURRENT_FRIEND_MESSAGE:
      const updateCurFrndMsgIndex = state.friends.findIndex(
        (friend) => friend.friendInfo._id === payload.id
      );
      if (state.friends[updateCurFrndMsgIndex].messageInfo) {
        state.friends[updateCurFrndMsgIndex].messageInfo.status = 'seen';
      }
      return { ...state };

    case MESSAGE_GET_SUCCESS_CLEAR:
      return {
        ...state,
        messageGetSuccess: false,
      };

    case SEEN_ALL:
      const seenSuccessIndex = state.friends.findIndex(
        (friend) => friend.friendInfo._id === payload.receiverId
      );
      state.friends[seenSuccessIndex].messageInfo.status = 'seen';
      return { ...state };

    default:
      return state;
  }
};
