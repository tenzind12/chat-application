import { FaPhone, FaRocketchat, FaVideo } from 'react-icons/fa6';
import Message from './Message';
import MessageSend from './MessageSend';
import FriendInfo from './FriendInfo';

const RightSide = ({
  currentFriend,
  inputHandler,
  newMessage,
  sendMessageHandler,
  scrollRef,
  emojiSendHandler,
  imageSendHandler,
  activeUsers,
}) => {
  // console.log(activeUsers);

  return (
    <div className="col-9">
      <div className="right-side">
        <input type="checkbox" id="dot" />
        <div className="row">
          <div className="col-8">
            <div className="message-send-show">
              <div className="header">
                <div className="image-name">
                  <div className="image">
                    <img src={`./images/${currentFriend.image}`} alt="" />
                    {activeUsers &&
                    activeUsers.length > 0 &&
                    activeUsers.some((user) => user.userId === currentFriend._id) ? (
                      <div className="active-icon"></div>
                    ) : (
                      <div className="inactive-icon"></div>
                    )}
                  </div>
                  <div className="name">
                    <h3>{currentFriend.username}</h3>
                  </div>
                </div>

                <div className="icons">
                  <div className="icon">
                    <FaPhone />
                  </div>
                  <div className="icon">
                    <FaVideo />
                  </div>
                  <div className="icon">
                    <label htmlFor="dot">
                      <FaRocketchat />
                    </label>
                  </div>
                </div>
              </div>
              <Message currentFriend={currentFriend} scrollRef={scrollRef} />
              <MessageSend
                inputHandler={inputHandler}
                newMessage={newMessage}
                sendMessageHandler={sendMessageHandler}
                emojiSendHandler={emojiSendHandler}
                imageSendHandler={imageSendHandler}
              />
            </div>
          </div>

          <div className="col-4">
            <FriendInfo currentFriend={currentFriend} activeUsers={activeUsers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
