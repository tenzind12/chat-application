import { FaPhone, FaRocketchat, FaVideo } from 'react-icons/fa6';
import Message from './Message';
import MessageSend from './MessageSend';
import FriendInfo from './FriendInfo';

const RightSide = ({ currentFriend, inputHandler, newMessage, sendMessageHandler }) => {
  // console.log(currentFriend);
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
              <Message />
              <MessageSend
                inputHandler={inputHandler}
                newMessage={newMessage}
                sendMessageHandler={sendMessageHandler}
              />
            </div>
          </div>

          <div className="col-4">
            <FriendInfo currentFriend={currentFriend} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
