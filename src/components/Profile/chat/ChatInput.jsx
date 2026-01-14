import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

const ChatInput = ({ value, onChange, onSend }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="Type your message..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <motion.button
        className="send-btn"
        onClick={onSend}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaPaperPlane />
      </motion.button>
    </div>
  );
};

export default ChatInput;