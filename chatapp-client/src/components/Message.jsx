import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
const moment = require('moment');

const Message = ({ currentFriend }) => {
  const { messages } = useSelector((state) => state.messenger);
  const { myInfo } = useSelector((state) => state.auth);

  // scroll ref
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView(); // { behavior: 'smooth' }
  }, [messages, scrollRef]);

  // converting date time with moment
  const momentDateTime = (dateString) => moment(dateString).format('D MMM YYYY');

  return (
    <div className="message-show">
      {messages && messages.length > 0
        ? messages.map((message, i) =>
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
                  </div>
                </div>

                <div className="time">{momentDateTime(message.createdAt)}</div>
              </div>
            ) : (
              <div className="fd-message" key={i} ref={scrollRef}>
                <div className="image-message">
                  <img src={`/images/${currentFriend.image}`} alt="" />
                  <div className="message-time">
                    <div className="fd-text">
                      <p className="message-text">
                        {message.message.text === '' ? (
                          <img src={`/images/chat/${message.message.image}`} alt="" />
                        ) : (
                          message.message.text
                        )}
                      </p>
                    </div>

                    <div className="time">{momentDateTime(message.createdAt)}</div>
                  </div>
                </div>
              </div>
            )
          )
        : ''}
    </div>
  );
};

export default Message;
