import { motion } from 'framer-motion';

const Message = ({ message, index }) => {
  return (
    <motion.div
      className={`message ${message.sender}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {message.sender === 'trainer' && (
        <img src={message.avatar} alt={message.name} className="message-avatar" />
      )}
      <div className="message-content">
        {message.sender === 'trainer' && (
          <span className="message-name">{message.name}</span>
        )}
        <p className="message-text">{message.message}</p>
        <span className="message-time">{message.time}</span>
      </div>
    </motion.div>
  );
};

export default Message;