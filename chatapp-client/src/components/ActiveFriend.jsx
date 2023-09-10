const ActiveFriend = ({ activeUsers, setCurrentFriend }) => {
  return (
    <>
      {activeUsers && activeUsers.length > 0
        ? activeUsers.map((user, i) => (
            <div
              className="active-friend"
              key={i}
              onClick={() => setCurrentFriend({ ...user.userInfo, _id: user.userInfo.id })}
            >
              <div className="image-active-icon">
                <div className="image">
                  <img src={`/images/${user.userInfo.image}`} alt="active user" />
                  <div className="active-icon"></div>
                </div>
              </div>
            </div>
          ))
        : ''}
    </>
  );
};

export default ActiveFriend;
