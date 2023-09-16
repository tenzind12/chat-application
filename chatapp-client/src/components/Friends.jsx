import moment from 'moment';
import { FaCheckDouble } from 'react-icons/fa6';

const Friends = ({ friend, myInfo }) => {
  const { friendInfo, messageInfo } = friend;

  return (
    <div className="friend">
      <div className="friend-image">
        <div className="image">
          <img src={'./images/' + friendInfo.image} alt={friend.friendInfo.username} />
        </div>
      </div>
      <div className="friend-name-seen">
        <div className="friend-name">
          <h4>{friendInfo.username}</h4>
          <div className="msg-time">
            {
              <strong>
                <small>
                  {messageInfo && messageInfo.senderId !== myInfo.id
                    ? messageInfo.senderName + ': '
                    : 'You: '}
                </small>
              </strong>
            }
            {messageInfo && messageInfo.message.text ? (
              <span>{messageInfo.message.text.slice(0, 10)}</span>
            ) : messageInfo && messageInfo.message.image ? (
              <span>Sent an image</span>
            ) : (
              <span>No message data</span>
            )}
            <br />
            <span>{messageInfo && moment(messageInfo.createdAt).startOf('mini').fromNow()}</span>
          </div>
        </div>

        {/* new message green icon */}
        {messageInfo && myInfo.id === messageInfo?.senderId ? (
          <div className="seen-unseen-icon">
            {messageInfo.status === 'seen' ? (
              <img src={`./images/${friendInfo.image}`} alt="" />
            ) : messageInfo.status === 'delivered' ? (
              <div className="delivered">
                <FaCheckDouble />
              </div>
            ) : (
              <div className="unseen"> </div>
            )}
          </div>
        ) : (
          <div className="seen-unseen-icon">
            {messageInfo?.status !== undefined && messageInfo?.status !== 'seen' ? (
              <div className="seen-icon"></div>
            ) : (
              ''
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
