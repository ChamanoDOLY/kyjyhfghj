import React from 'react';

const ChatHeader = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
          </svg>
        </div>
        <div>
          <h1 className="font-semibold text-gray-800">AI Assistant</h1>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;