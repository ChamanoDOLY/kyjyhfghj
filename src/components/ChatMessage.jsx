import React from 'react';
import ImageGallery from './ImageGallery';
import ButtonGroup from './ButtonGroup';

const ChatMessage = ({ message, isUser, isTyping }) => {
  if (isTyping) {
    return (
      <div className="message-wrapper animate-fadeInUp">
        <div className="message-avatar bot">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#666">
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </div>
        <div className="message-bubble typing">
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="message-wrapper user animate-slideInRight">
        <div className="message-avatar user">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <div className="message-bubble user">
          <p>{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="message-wrapper animate-slideInLeft">
      <div className="message-avatar bot">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#666">
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </div>
      <div className="message-bubble bot">
        <p>{message.text}</p>
        
        {message.buttons && message.buttons.length > 0 && (
          <ButtonGroup buttons={message.buttons} />
        )}
        
        {message.gallery && message.gallery.length > 0 && (
          <ImageGallery images={message.gallery} />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;