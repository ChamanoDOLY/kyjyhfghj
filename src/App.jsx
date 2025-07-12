import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Componente de Mensagem do Chat
const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#666"/>
          </svg>
        </div>
      )}
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isUser 
          ? 'bg-blue-500 text-white' 
          : 'bg-white text-gray-800 border border-gray-200'
      }`}>
        <p className="text-sm">{message.text}</p>
        
        {message.buttons && (
          <div className="mt-3 space-y-2">
            {message.buttons.map((button, index) => (
              <button
                key={index}
                onClick={button.onClick}
                className="w-full px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                {button.text}
              </button>
            ))}
          </div>
        )}
        
        {message.gallery && (
          <div className="mt-3">
            <div className="grid grid-cols-2 gap-2">
              {message.gallery.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-2">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-20 object-cover rounded mb-2"
                  />
                  <p className="text-xs font-medium mb-1">{item.title}</p>
                  <button 
                    onClick={item.onTryNow}
                    className="w-full px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Try Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Estado Vazio
const EmptyState = ({ onSuggestionClick }) => {
  const suggestions = [
    "Generate visuals",
    "Create content",
    "Help with design",
    "Analyze data"
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        How can I help you today?
      </h2>
      <p className="text-gray-600 mb-6">
        Ask me anything or try one of these suggestions
      </p>
      <div className="grid grid-cols-2 gap-2 w-full max-w-md">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

// Componente de Input do Chat
const ChatInput = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={disabled}
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="w-12 h-12 bg-black hover:bg-gray-800 disabled:bg-gray-400 rounded-full flex items-center justify-center transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </form>
    </div>
  );
};

// Indicador de Digitação
const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#666"/>
        </svg>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

// Hook personalizado para gerenciar o chat
const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const simulateResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('visual') || lowerMessage.includes('generate')) {
      return {
        text: "I can help you generate visuals! Here are some options:",
        buttons: [
          { text: "Generate visuals", onClick: () => console.log('Generate visuals clicked') },
          { text: "Create mockups", onClick: () => console.log('Create mockups clicked') },
          { text: "Design templates", onClick: () => console.log('Design templates clicked') }
        ]
      };
    }
    
    if (lowerMessage.includes('gallery') || lowerMessage.includes('image')) {
      return {
        text: "Here are some visual examples:",
        gallery: [
          {
            image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=200",
            title: "Design 1",
            onTryNow: () => console.log('Try Design 1')
          },
          {
            image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=200",
            title: "Design 2",
            onTryNow: () => console.log('Try Design 2')
          },
          {
            image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=200",
            title: "Design 3",
            onTryNow: () => console.log('Try Design 3')
          },
          {
            image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200",
            title: "Design 4",
            onTryNow: () => console.log('Try Design 4')
          }
        ]
      };
    }
    
    return {
      text: "I understand! I'm here to help you with design, content creation, and visual generation. What would you like to work on?"
    };
  };

  const sendMessage = (text) => {
    const userMessage = { text, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const botResponse = simulateResponse(text);
      setMessages(prev => [...prev, { ...botResponse, isUser: false }]);
      setIsLoading(false);
    }, 1000);
  };

  return { messages, isLoading, sendMessage };
};

// Componente Principal
function App() {
  const { messages, isLoading, sendMessage } = useChat();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">AI Assistant</h1>
            <p className="text-sm text-gray-600">Online</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <EmptyState onSuggestionClick={handleSuggestionClick} />
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} isUser={message.isUser} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
    </div>
  );
}

export default App;