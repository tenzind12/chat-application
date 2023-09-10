import { FaSquareCaretDown } from 'react-icons/fa6';

const FriendInfo = ({ currentFriend, activeUsers }) => {
  return (
    <div className="friend-info">
      <input type="checkbox" id="gallery" />
      <div className="image-name">
        <div className="image">
          <img src={`./images/${currentFriend.image}`} alt={currentFriend.username} />
        </div>

        {activeUsers &&
        activeUsers.length > 0 &&
        activeUsers.some((user) => user.userId === currentFriend._id) ? (
          <div className="active-user">Active</div>
        ) : (
          ''
        )}

        <div className="name">
          <h4>{currentFriend.username}</h4>
        </div>
      </div>

      <div className="others">
        <div className="custom-chat">
          <h3>Customise Chat</h3>
          <FaSquareCaretDown />
        </div>
        <div className="privacy">
          <h3>Privacy and Support</h3>
          <FaSquareCaretDown />
        </div>
        <div className="media">
          <h3>Shared Media</h3>
          <label htmlFor="gallery">
            <FaSquareCaretDown />
          </label>
        </div>
      </div>

      <div className="gallery">
        <img src="/images/88842intro-bg.jpg" alt="" />
        <img src="/images/88842intro-bg.jpg" alt="" />
        <img src="/images/88842intro-bg.jpg" alt="" />
        <img src="/images/88842intro-bg.jpg" alt="" />
      </div>
    </div>
  );
};

export default FriendInfo;
