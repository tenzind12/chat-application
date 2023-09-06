import axios from 'axios';

export const getFriends = () => {
  return async (data) => {
    try {
      const response = await axios.get('/api/messenger/get-friends');
      console.log(response.data);
    } catch (error) {
      console.log('here', error);
    }
  };
};
