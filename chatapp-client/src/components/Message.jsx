import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
const moment = require('moment');

const Message = ({ currentFriend, typingMessage }) => {
  const { messages } = useSelector((state) => state.messenger);
  const { myInfo } = useSelector((state) => state.auth);

  // scroll ref
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView(); // { behavior: 'smooth' }
  }, [messages, scrollRef]);

  return (
    <>
      <div className="message-show">
        {messages && messages.length > 0 ? (
          messages.map((message, i) =>
            message.senderId === myInfo.id ? (
              <div className="my-message" key={i} ref={scrollRef}>
                <div className="image-message">
                  <div className="my-text">
                    <p className="message-text">
                      {message.message.text === '' ? (
                        <img src={`/images/chat/${message.message.image}`} alt="" />
                      ) : (
                        message.message.text
                      )}
                    </p>

                    {i === messages.length - 1 && message.senderId === myInfo.id ? (
                      message.status === 'seen' ? (
                        <img className="img" src={`/images/${currentFriend.image}`} alt="" />
                      ) : message.status === 'delivered' ? (
                        <img className="img" src="/icons/delivered-icon.png" alt="" />
                      ) : (
                        <img className="img" src="/icons/single-tick.png" alt="" />
                      )
                    ) : (
                      ''
                    )}
                  </div>
                </div>

                <div className="time">{moment(message.createdAt).fromNow()}</div>
              </div>
            ) : (
              <div className="fd-message" key={i} ref={scrollRef}>
                <div className="image-message">
                  <img src={`/images/${currentFriend.image}`} alt="" />
                  <div className="message-time">
                    <div className="fd-text">
                      <p className="message-text">
                        {message?.message.text === '' ? (
                          <img src={`/images/chat/${message.message.image}`} alt="" />
                        ) : (
                          message.message.text
                        )}
                      </p>
                    </div>

                    <div className="time">{moment(message.createdAt).fromNow()}</div>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div className="friend_connect">
            <img src={`/images/${currentFriend.image}`} alt={currentFriend.username} />
            <h3>Connect with {currentFriend.username}</h3>
            <span>Account created {moment(currentFriend.createdAt).startOf('mini').fromNow()}</span>
          </div>
        )}
      </div>

      {/* display user is typing */}
      {typingMessage && typingMessage.message && typingMessage.senderId === currentFriend._id && (
        <div className="typing-message">
          <div className="fd-message">
            <div className="image-message">
              <img src={`/images/${currentFriend.image}`} alt="" />
              <div className="message-time">
                <div className="fd-text">
                  <p className="time">Typing message ...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
