import { GET_FRIENDS_SUCCESS } from '../type/messenger.types';

const messengerState = {
  friends: [],
};

export const messengerReducer = (state = messengerState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FRIENDS_SUCCESS:
      return { ...state, friends: payload.friends };

    default:
      return state;
  }
};
