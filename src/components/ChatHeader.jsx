import React from 'react';

const ChatHeader = () => {
  return (
    <div className="chat-header">
      <div className="header-avatar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
        </svg>
      </div>
      <div className="header-info">
        <h1>AI Assistant</h1>
        <p>Online</p>
      </div>
    </div>
  );
};

export default ChatHeader;