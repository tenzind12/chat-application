import { FaPhone, FaRocketchat, FaVideo } from 'react-icons/fa6';
import Message from './Message';

const RightSide = () => {
  return (
    <div className="col-9">
      <div className="right-side">
        <div className="row">
          <div className="col-8">
            <div className="message-send-show">
              <div className="header">
                <div className="image-name">
                  <div className="image">
                    <img src="/images/792831653683268839.jfif" alt="" />
                  </div>
                  <div className="name">
                    <h3>Tenzin</h3>
                  </div>
                </div>

                <div className="icons">
                  <div className="icon">
                    <FaPhone />
                  </div>
                  <div className="icon">
                    <FaVideo />
                  </div>
                  <div className="icon">
                    <FaRocketchat />
                  </div>
                </div>
              </div>
              <Message />
            </div>
          </div>

          <div className="col-4">User about page</div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
