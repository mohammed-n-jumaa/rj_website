import MessagesList from './MessagesList';
import ChatInput from './ChatInput';

const ChatContainer = ({ messages, chatMessage, setChatMessage, onSendMessage }) => {
  return (
    <div className="chat-container">
      <MessagesList messages={messages} />
      <ChatInput
        value={chatMessage}
        onChange={setChatMessage}
        onSend={onSendMessage}
      />
    </div>
  );
};

export default ChatContainer;