import { useState } from 'react';
import ChatContainer from './chat/ChatContainer';

const ChatTab = ({ messages }) => {
  const [chatMessage, setChatMessage] = useState('');

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Handle send message
      setChatMessage('');
    }
  };

  return (
    <div className="chat-tab">
      <ChatContainer
        messages={messages}
        chatMessage={chatMessage}
        setChatMessage={setChatMessage}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatTab;