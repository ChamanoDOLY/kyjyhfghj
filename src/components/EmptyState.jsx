import React from 'react';

const EmptyState = ({ onSuggestionClick }) => {
  const suggestions = [
    "What can you help me with?",
    "Show me some examples", 
    "Generate visuals",
    "Tell me about your features"
  ];

  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#666">
          <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
        </svg>
      </div>
      
      <h2>How can I help you today?</h2>
      
      <p>I'm here to assist you with various tasks. You can ask me anything or try one of these suggestions:</p>
      
      <div className="suggestions-grid">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="suggestion-button"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmptyState;