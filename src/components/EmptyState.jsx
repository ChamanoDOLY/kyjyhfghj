import React from 'react';

const EmptyState = ({ onSuggestionClick }) => {
  const suggestions = [
    "What can you help me with?",
    "Show me some examples",
    "Generate visuals",
    "Tell me about your features"
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" fill="#666"/>
        </svg>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        How can I help you today?
      </h2>
      
      <p className="text-gray-600 mb-8 max-w-sm">
        I'm here to assist you with various tasks. You can ask me anything or try one of these suggestions:
      </p>
      
      <div className="grid grid-cols-1 gap-3 w-full max-w-sm">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm text-gray-700 transition-colors text-left focus-visible:focus-visible"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmptyState;