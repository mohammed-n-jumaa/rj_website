import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaComments, 
  FaPaperPlane,
  FaImage,
  FaSmile,
  FaCheckDouble,
  FaCheck
} from 'react-icons/fa';
import './Chat.scss';

const Chat = ({ chatData }) => {
  const [messages, setMessages] = useState(chatData || [
    {
      id: 1,
      sender: 'trainer',
      text: 'مرحباً! كيف كان تمرينك اليوم؟',
      time: '10:30 صباحاً',
      read: true,
      avatar: 'https://ui-avatars.com/api/?name=Rand+Jarar&background=E91E63&color=fff'
    },
    {
      id: 2,
      sender: 'user',
      text: 'رائع! أكملت كل التمارين 💪',
      time: '10:45 صباحاً',
      read: true,
      avatar: 'https://ui-avatars.com/api/?name=Amira&background=2196F3&color=fff'
    },
    {
      id: 3,
      sender: 'trainer',
      text: 'ممتاز! استمري على هذا المستوى. لا تنسي شرب الماء بكثرة 💧',
      time: '10:47 صباحاً',
      read: true,
      avatar: 'https://ui-avatars.com/api/?name=Rand+Jarar&background=E91E63&color=fff'
    },
    {
      id: 4,
      sender: 'user',
      text: 'شكراً! عندي سؤال عن الوجبة الثانية',
      time: '11:15 صباحاً',
      read: false,
      avatar: 'https://ui-avatars.com/api/?name=Amira&background=2196F3&color=fff'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'user',
        text: newMessage,
        time: new Date().toLocaleTimeString('ar-EG', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        read: false,
        avatar: 'https://ui-avatars.com/api/?name=Amira&background=2196F3&color=fff'
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Simulate trainer typing
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Simulate trainer response
        const trainerResponse = {
          id: messages.length + 2,
          sender: 'trainer',
          text: 'تمام! سأرد على سؤالك بالتفصيل 😊',
          time: new Date().toLocaleTimeString('ar-EG', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          }),
          read: false,
          avatar: 'https://ui-avatars.com/api/?name=Rand+Jarar&background=E91E63&color=fff'
        };
        setMessages(prev => [...prev, trainerResponse]);
      }, 2000);
    }
  };

  const unreadCount = messages.filter(m => !m.read && m.sender === 'trainer').length;

  return (
    <div className="chat-section">
      {/* Header */}
      <div className="chat-header">
        <div className="header-info">
          <div className="trainer-avatar">
            <img src="https://ui-avatars.com/api/?name=Rand+Jarar&background=E91E63&color=fff&size=50" alt="Trainer" />
            <span className="online-badge"></span>
          </div>
          <div className="trainer-details">
            <h3>رند جرار</h3>
            <p className="status">نشطة الآن</p>
          </div>
        </div>
        
        {unreadCount > 0 && (
          <div className="unread-badge">
            {unreadCount} رسالة جديدة
          </div>
        )}
      </div>

      {/* Messages Container */}
      <div className="messages-container">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'sent' : 'received'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              {message.sender === 'trainer' && (
                <div className="message-avatar">
                  <img src={message.avatar} alt="Trainer" />
                </div>
              )}
              
              <div className="message-content">
                <div className="message-bubble">
                  <p>{message.text}</p>
                </div>
                <div className="message-meta">
                  <span className="message-time">{message.time}</span>
                  {message.sender === 'user' && (
                    <span className="message-status">
                      {message.read ? <FaCheckDouble /> : <FaCheck />}
                    </span>
                  )}
                </div>
              </div>

              {message.sender === 'user' && (
                <div className="message-avatar">
                  <img src={message.avatar} alt="User" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div 
            className="typing-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="message-avatar">
              <img src="https://ui-avatars.com/api/?name=Rand+Jarar&background=E91E63&color=fff&size=40" alt="Trainer" />
            </div>
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form className="chat-input" onSubmit={handleSendMessage}>
        <div className="input-actions">
          <motion.button
            type="button"
            className="action-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaImage />
          </motion.button>
          <motion.button
            type="button"
            className="action-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaSmile />
          </motion.button>
        </div>

        <input
          type="text"
          placeholder="اكتبي رسالتك هنا..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="message-input"
        />

        <motion.button
          type="submit"
          className="send-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!newMessage.trim()}
        >
          <FaPaperPlane />
        </motion.button>
      </form>

      {/* Quick Replies */}
      <div className="quick-replies">
        <p className="quick-replies-label">ردود سريعة:</p>
        <div className="quick-replies-buttons">
          {['شكراً 🙏', 'تمام 👍', 'عندي سؤال ❓', 'محتاجة مساعدة 💪'].map((reply, index) => (
            <motion.button
              key={index}
              className="quick-reply-btn"
              onClick={() => setNewMessage(reply)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {reply}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;