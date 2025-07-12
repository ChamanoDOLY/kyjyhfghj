import React from 'react';

const ChatInput = ({ inputValue, setInputValue, onSubmit, isLoading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <div className="bg-white border-t border-gray-200 px-6 py-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything…"
            disabled={isLoading}
            className="w-full px-4 py-3 bg-gray-100 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="w-10 h-10 bg-black hover:bg-gray-800 disabled:bg-gray-400 rounded-full flex items-center justify-center transition-colors focus-visible:focus-visible"
          aria-label="Send message"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;