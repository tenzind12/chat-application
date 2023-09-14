const Friends = ({ friend }) => {
  return (
    <div className="friend">
      <div className="friend-image">
        <div className="image">
          <img src={'./images/' + friend.image} alt={friend.username} />
        </div>
      </div>
      <div className="friend-name-seen">
        <div className="friend-name">
          <h4>{friend.username}</h4>
        </div>
      </div>
    </div>
  );
};

export default Friends;
