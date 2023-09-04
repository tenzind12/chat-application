import { FaEllipsis, FaMagnifyingGlass, FaPenToSquare } from 'react-icons/fa6';
import ActiveFriend from './ActiveFriend';
import Friends from './Friends';

const Messenger = () => {
  return (
    <div className="messenger">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src="/images/792831653683268839.jfif" alt="user profile" />
                </div>

                <div className="name">
                  <h3>Hi Tenzin</h3>
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
              <div className="hover-friend">
                <Friends />
              </div>
              <div className="hover-friend">
                <Friends />
              </div>
              <div className="hover-friend">
                <Friends />
              </div>
              <div className="hover-friend">
                <Friends />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
