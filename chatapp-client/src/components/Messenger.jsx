import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEllipsis, FaMagnifyingGlass, FaPenToSquare } from 'react-icons/fa6';
import ActiveFriend from './ActiveFriend';
import Friends from './Friends';
import RightSide from './RightSide';
import {
  requestFriends,
  requestGetMessage,
  requestSendMessage,
} from '../store/actions/messenger.action';

const Messenger = () => {
  const [currentFriend, setCurrentFriend] = useState('');
  const [newMessage, setNewMessage] = useState('');

  // message input handler
  const inputHandler = (e) => {
    setNewMessage(e.target.value);
  };

  // message send handler
  const sendMessageHandler = (e) => {
    e.preventDefault();
    const data = {
      senderName: myInfo.username,
      receiverId: currentFriend._id,
      message: newMessage ? newMessage : '🤍',
    };

    dispatch(requestSendMessage(data));
  };

  const { friends } = useSelector((state) => state.messenger);
  const { myInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestFriends());
  }, []);

  // load the first freind as current friend
  useEffect(() => {
    if (friends && friends.length > 0) {
      setCurrentFriend(friends[0]);
    }
  }, [friends]);

  // for single friend convo
  useEffect(() => {
    dispatch(requestGetMessage(currentFriend._id));
  }, [currentFriend?._id, dispatch]);

  return (
    <div className="messenger">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src={`/images/${myInfo.image}`} alt={myInfo.username} />
                </div>

                <div className="name">
                  <h3>Hi {myInfo.username} </h3>
                </div>
              </div>

              <div className="icons">
                <div className="icon">
                  <FaEllipsis />
                </div>
                <div className="icon">
                  <FaPenToSquare />
                </div>
              </div>
            </div>

            <div className="friend-search">
              <div className="search">
                <button>
                  <FaMagnifyingGlass />
                </button>
                <input type="text" placeholder="search" className="form-control" />
              </div>
            </div>

            <div className="active-friends">
              <ActiveFriend />
            </div>

            <div className="friends">
              {friends && friends.length > 0
                ? friends.map((friend, i) => (
                    <div
                      onClick={() => setCurrentFriend(friend)}
                      className={`${currentFriend._id === friend._id ? 'active' : ''} hover-friend`}
                      key={i}
                    >
                      <Friends friend={friend} />
                    </div>
                  ))
                : 'No Friends'}
            </div>
          </div>
        </div>

        {currentFriend ? (
          <RightSide
            currentFriend={currentFriend}
            inputHandler={inputHandler}
            newMessage={newMessage}
            sendMessageHandler={sendMessageHandler}
          />
        ) : (
          'Select a friend from the list to continue the chat'
        )}
      </div>
    </div>
  );
};

export default Messenger;
