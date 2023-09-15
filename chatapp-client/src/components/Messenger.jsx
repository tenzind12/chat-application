import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEllipsis, FaMagnifyingGlass, FaPenToSquare } from 'react-icons/fa6';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import useSound from 'use-sound';
import notificationSound from '../audio/notification.mp3';
import sendMessageSound from '../audio/sending.mp3';
import ActiveFriend from './ActiveFriend';
import Friends from './Friends';
import RightSide from './RightSide';
import {
  requestFriends,
  requestGetMessage,
  requestSendImage,
  requestSendMessage,
  sendRealtimeMessage,
} from '../store/actions/messenger.action';
import {
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_SUCCESS_CLEAR,
  UPDATE_FRIEND_MESSAGE,
} from '../store/type/messenger.types';

const Messenger = () => {
  // sound
  const [playNotification] = useSound(notificationSound);
  const [playSendMessageSound] = useSound(sendMessageSound);

  // selecting data from redux store
  const { friends, messages, messageSendSuccess } = useSelector((state) => state.messenger);
  const { myInfo } = useSelector((state) => state.auth);

  const [currentFriend, setCurrentFriend] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newSocketMessage, setNewSocketMessage] = useState('');
  const [typingMessage, setTypingMessage] = useState('');

  // S O C K E T  I O
  const socketRef = useRef();
  // console.log(socketRef);

  // signed in user with socket
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    socketRef.current = io('ws://localhost:8000');
    socketRef.current.on('getMessage', (message) => {
      setNewSocketMessage(message);
    });

    socketRef.current.on('getTypingMessage', (data) => {
      setTypingMessage(data);
    });
  }, []);

  // new socket message
  useEffect(() => {
    if (newSocketMessage && currentFriend) {
      if (
        newSocketMessage.senderId === currentFriend._id &&
        newSocketMessage.receiverId === myInfo.id
      ) {
        dispatch(sendRealtimeMessage(newSocketMessage));
        dispatch({
          type: UPDATE_FRIEND_MESSAGE,
          payload: {
            messageInfo: newSocketMessage,
          },
        });
      }
    }

    setNewSocketMessage('');
  }, [newSocketMessage]);

  // adding self to active user
  useEffect(() => {
    socketRef.current.emit('addActiveUser', myInfo.id, myInfo); // sending to BE
  }, [myInfo]);

  // Getting current active users from backend
  useEffect(() => {
    // receiving from BE
    socketRef.current.on('getActiveUser', (users) => {
      // dont show self in activeUsers
      const filteredUser = users.filter((user) => user.userId !== myInfo.id);
      setActiveUsers(filteredUser);
    });
  }, [myInfo]);

  // message input handler
  const inputHandler = (e) => {
    setNewMessage(e.target.value);

    // sending to backend (when user is typing)
    socketRef.current.emit('typingMessage', {
      senderId: myInfo.id,
      receiverId: currentFriend._id,
      message: e.target.value,
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestFriends());
  }, []);

  // load the first freind as current friend
  useEffect(() => {
    if (friends && friends.length > 0) {
      setCurrentFriend(friends[0].friendInfo);
    }
  }, [friends]);

  // for single friend convo
  useEffect(() => {
    dispatch(requestGetMessage(currentFriend._id));
  }, [currentFriend?._id, dispatch]);

  // notification when not current friend sends a msg
  useEffect(() => {
    if (
      newSocketMessage &&
      newSocketMessage.senderId !== currentFriend._id &&
      newSocketMessage.receiverId === myInfo.id
    ) {
      playNotification();
      toast.success(`${newSocketMessage.senderName} has sent a message`);
    }
  }, [newSocketMessage]);

  // for sending emoji
  const emojiSendHandler = (emo) => {
    socketRef.current.emit('typingMessage', {
      senderId: myInfo.id,
      receiverId: currentFriend._id,
      message: emo,
    });

    setNewMessage(`${newMessage}` + emo);
  };

  // message send handler
  const sendMessageHandler = (e) => {
    playSendMessageSound();
    const data = {
      senderName: myInfo.username,
      receiverId: currentFriend._id,
      message: newMessage ? newMessage : '🤍',
    };

    dispatch(requestSendMessage(data));

    // clear input
    setNewMessage('');

    // sending to backend (when user is done typing)
    socketRef.current.emit('typingMessage', {
      senderId: myInfo.id,
      receiverId: currentFriend._id,
      message: '',
    });
  };

  //
  useEffect(() => {
    if (messageSendSuccess) {
      const lastMessageSent = messages[messages.length - 1];
      // Send data to the socket backend
      socketRef.current.emit('sendMessage', lastMessageSent);

      dispatch({
        type: UPDATE_FRIEND_MESSAGE,
        payload: {
          messageInfo: lastMessageSent,
        },
      });

      dispatch({
        type: MESSAGE_SEND_SUCCESS_CLEAR,
      });
    }
  }, [dispatch, messageSendSuccess, messages]);

  // sending image
  const imageSendHandler = (e) => {
    const imageFileList = e.target.files;

    if (imageFileList.length !== 0) {
      playSendMessageSound();
      const imageName = imageFileList[0].name;
      const newImageName = Date.now() + imageName;

      // Send data(image) to the socket backend
      socketRef.current.emit('sendMessage', {
        senderId: myInfo.id,
        senderName: myInfo.username,
        receiverId: currentFriend._id,
        time: new Date(),
        message: {
          text: '',
          image: newImageName,
        },
      });

      // form data
      const formData = new FormData();
      formData.append('senderName', myInfo.username);
      formData.append('receiverId', currentFriend._id);
      formData.append('imageName', newImageName);
      formData.append('image', imageFileList[0]);

      dispatch(requestSendImage(formData));
    }
  };

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
              {activeUsers && activeUsers.length > 0 ? (
                <ActiveFriend activeUsers={activeUsers} setCurrentFriend={setCurrentFriend} />
              ) : (
                <small>
                  <i>No friends online</i>
                </small>
              )}
            </div>

            <div className="friends">
              {friends && friends.length > 0
                ? friends.map((friend, i) => (
                    <div
                      onClick={() => setCurrentFriend(friend.friendInfo)}
                      className={`${
                        currentFriend._id === friend.friendInfo._id ? 'active' : ''
                      } hover-friend`}
                      key={i}
                    >
                      <Friends friend={friend} myInfo={myInfo} />
                    </div>
                  ))
                : 'No Friends'}
            </div>
          </div>
        </div>

        <div className="col-9">
          {currentFriend ? (
            <RightSide
              currentFriend={currentFriend}
              inputHandler={inputHandler}
              newMessage={newMessage}
              sendMessageHandler={sendMessageHandler}
              emojiSendHandler={emojiSendHandler}
              imageSendHandler={imageSendHandler}
              activeUsers={activeUsers}
              typingMessage={typingMessage}
            />
          ) : (
            'Select a friend from the list to continue the chat'
          )}
        </div>
      </div>
    </div>
  );
};

export default Messenger;
