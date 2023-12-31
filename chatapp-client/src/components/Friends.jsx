import moment from 'moment';

const Friends = ({ friend, myInfo, activeUsers }) => {
  const { friendInfo, messageInfo } = friend;

  return (
    <div className="friend">
      <div className="friend-image">
        <div className="image">
          <img src={'./images/' + friendInfo.image} alt={friend.friendInfo.username} />

          {/* show green dot when online */}
          {activeUsers &&
            activeUsers.length > 0 &&
            activeUsers.some((user) => user.userId === friendInfo._id) && (
              <div className="active_icon"></div>
            )}
        </div>
      </div>
      <div className="friend-name-seen">
        <div className="friend-name">
          <h4
            className={
              messageInfo?.senderId !== myInfo.id &&
              messageInfo?.status !== undefined &&
              messageInfo?.status !== 'seen'
                ? 'unseen_message fd_name '
                : 'fd_name'
            }
          >
            {friendInfo.username}
          </h4>
          <div className="msg-time">
            {
              <strong
                className={
                  messageInfo?.senderId !== myInfo.id &&
                  messageInfo?.status !== undefined &&
                  messageInfo?.status !== 'seen'
                    ? 'unseen_message'
                    : ''
                }
              >
                <small>
                  {messageInfo && messageInfo.senderId !== myInfo.id
                    ? messageInfo.senderName + ': '
                    : 'You: '}
                </small>
              </strong>
            }
            {messageInfo && messageInfo.message.text ? (
              <span
                className={
                  messageInfo?.senderId !== myInfo.id &&
                  messageInfo?.status !== undefined &&
                  messageInfo?.status !== 'seen'
                    ? 'unseen_message'
                    : ''
                }
              >
                {messageInfo.message.text.slice(0, 10)}
              </span>
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
              <img src="/icons/seen-icon.png" alt="" />
            ) : messageInfo.status === 'delivered' ? (
              <div className="delivered">
                <img src="/icons/delivered-icon.png" alt="" />
              </div>
            ) : (
              <div className="unseen">
                <img src="/icons/single-tick.png" alt="" />
              </div>
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
