import React from 'react';

const ChatMessage = ({ message, isUser, isTyping }) => {
  if (isTyping) {
    return (
      <div className="flex items-start gap-3 mb-6 animate-fadeInUp">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" fill="#666"/>
          </svg>
        </div>
        <div className="bg-white rounded-2xl px-4 py-3 max-w-xs shadow-sm border">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="flex justify-end mb-6 animate-slideInRight">
        <div className="bg-blue-500 text-white rounded-2xl px-4 py-3 max-w-xs">
          <p className="text-sm">{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 mb-6 animate-slideInLeft">
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" fill="#666"/>
        </svg>
      </div>
      <div className="bg-white rounded-2xl px-4 py-3 max-w-md shadow-sm border">
        <p className="text-sm text-gray-800 mb-3">{message.text}</p>
        
        {message.buttons && message.buttons.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {message.buttons.map((button, index) => (
              <button
                key={index}
                onClick={button.onClick}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors focus-visible:focus-visible"
              >
                {button.text}
              </button>
            ))}
          </div>
        )}
        
        {message.gallery && message.gallery.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mt-3">
            {message.gallery.map((image, index) => (
              <div key={index} className="relative">
                <img 
                  src={image.url} 
                  alt={image.alt}
                  className="w-full h-32 object-cover rounded-lg"
                  loading="lazy"
                />
                <button 
                  onClick={image.onTryNow}
                  className="absolute bottom-2 left-2 bg-black text-white px-3 py-1 rounded-full text-xs hover:bg-gray-800 transition-colors focus-visible:focus-visible"
                >
                  Try Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;