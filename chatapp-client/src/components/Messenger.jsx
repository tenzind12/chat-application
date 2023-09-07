import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEllipsis, FaMagnifyingGlass, FaPenToSquare } from 'react-icons/fa6';
import ActiveFriend from './ActiveFriend';
import Friends from './Friends';
import RightSide from './RightSide';
import { getFriends } from '../store/actions/messenger.action';

const Messenger = () => {
  const dispatch = useDispatch();

  const { friends } = useSelector((state) => state.messenger);
  const { myInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getFriends());
  }, []);

  return (
    <div className="messenger">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src={`/images/${myInfo.image}`} alt={myInfo.username} />
                </div>

                <div className="name">
                  <h3>Hi {myInfo.username} </h3>
                </div>
              </div>

              <div className="icons">
                <div className="icon">
                  <FaEllipsis />
                </div>
                <div className="icon">
                  <FaPenToSquare />
                </div>
              </div>
            </div>

            <div className="friend-search">
              <div className="search">
                <button>
                  <FaMagnifyingGlass />
                </button>
                <input type="text" placeholder="search" className="form-control" />
              </div>
            </div>

            <div className="active-friends">
              <ActiveFriend />
            </div>

            <div className="friends">
              {friends && friends.length > 0
                ? friends.map((friend, i) => (
                    <div className="hover-friend" key={i}>
                      <Friends friend={friend} />
                    </div>
                  ))
                : 'No Friends'}
            </div>
          </div>
        </div>

        <RightSide />
      </div>
    </div>
  );
};

export default Messenger;
