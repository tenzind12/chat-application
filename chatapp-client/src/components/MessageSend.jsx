import { FaFileImage, FaGift, FaPaperclip, FaRegHeart, FaRegPaperPlane } from 'react-icons/fa6';

const MessageSend = ({ inputHandler, newMessage, sendMessageHandler }) => {
  const emojis = [
    '😀',
    '😃',
    '😄',
    '😁',
    '😆',
    '😅',
    '😂',
    '🤣',
    '😊',
    '😇',
    '🙂',
    '🙃',
    '😉',
    '😌',
    '😍',
    '😝',
    '😜',
    '🧐',
    '🤓',
    '😎',
    '😕',
    '🤑',
    '🥴',
    '😱',
  ];

  return (
    <div className="message-send-section">
      <input type="checkbox" id="emoji" />
      <div className="file hover-attachment">
        <div className="add-attachment">Add Attachment</div>
        <FaPaperclip />
      </div>

      <div className="file hover-image">
        <div className="add-image">Add Image</div>
        <label htmlFor="pic">
          <FaFileImage />
        </label>
      </div>

      <div className="file hover-gift">
        <div className="add-gift">Add Gift</div>
        <FaGift />
      </div>

      <div className="message-type">
        <input
          onChange={inputHandler}
          value={newMessage}
          type="text"
          name="message"
          id="message"
          placeholder="Aa"
          className="form-control"
        />

        <div className="file" onClick={sendMessageHandler}>
          <FaRegPaperPlane />
        </div>
      </div>

      <div className="file">
        <label htmlFor="emoji">
          <FaRegHeart />
        </label>
      </div>

      <div className="emoji-section">
        <div className="emoji">
          {emojis.map((emoji, i) => (
            <span key={i}>{emoji}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageSend;
