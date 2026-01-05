import { motion } from 'framer-motion';
import Message from './Message';

const MessagesList = ({ messages }) => {
  return (
    <div className="messages-list">
      {messages.map((msg, index) => (
        <Message key={msg.id} message={msg} index={index} />
      ))}
    </div>
  );
};

export default MessagesList;