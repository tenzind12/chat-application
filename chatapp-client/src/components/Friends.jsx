import moment from 'moment';

const Friends = ({ friend, myInfo }) => {
  const { friendInfo, messageInfo } = friend;
  console.log(messageInfo?.senderId, myInfo.id);
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
        {messageInfo?.senderId === myInfo.id ? (
          <div className="seen-unseen-icon">
            <img src={`/images/${friendInfo.image}`} alt={friendInfo.username} />
          </div>
        ) : (
          <div className="seen-unseen-icon">
            <div className="seen-icon"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
