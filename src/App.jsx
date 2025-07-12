import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Componente para mensagens do chat
const ChatMessage = ({ message, isUser, isTyping }) => {
  if (isTyping) {
    return (
      <div className="flex items-start gap-3 mb-6">
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
      <div className="flex justify-end mb-6">
        <div className="bg-blue-500 text-white rounded-2xl px-4 py-3 max-w-xs">
          <p className="text-sm">{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" fill="#666"/>
        </svg>
      </div>
      <div className="bg-white rounded-2xl px-4 py-3 max-w-md shadow-sm border">
        <p className="text-sm text-gray-800 mb-3">{message.text}</p>
        
        {message.buttons && (
          <div className="flex flex-wrap gap-2 mb-3">
            {message.buttons.map((button, index) => (
              <button
                key={index}
                onClick={button.onClick}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors"
              >
                {button.text}
              </button>
            ))}
          </div>
        )}
        
        {message.gallery && (
          <ImageGallery images={message.gallery} />
        )}
      </div>
    </div>
  );
};

// Componente para galeria de imagens
const ImageGallery = ({ images }) => {
  return (
    <div className="grid grid-cols-2 gap-3 mt-3">
      {images.map((image, index) => (
        <div key={index} className="relative">
          <img 
            src={image.url} 
            alt={image.alt}
            className="w-full h-32 object-cover rounded-lg"
          />
          <button 
            onClick={image.onTryNow}
            className="absolute bottom-2 left-2 bg-black text-white px-3 py-1 rounded-full text-xs hover:bg-gray-800 transition-colors"
          >
            Try Now
          </button>
        </div>
      ))}
    </div>
  );
};

// Componente para o estado vazio
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
            className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm text-gray-700 transition-colors text-left"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

// Hook customizado para gerenciar o chat
const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    // Simular resposta do backend
    setTimeout(() => {
      setIsTyping(false);
      
      const botResponse = generateBotResponse(text);
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateBotResponse = (userText) => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('visual') || lowerText.includes('image') || lowerText.includes('gallery')) {
      return {
        id: Date.now() + 1,
        text: "Here are some visual examples I can help you create:",
        isUser: false,
        timestamp: new Date(),
        gallery: [
          {
            url: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=300",
            alt: "AI Generated Art",
            onTryNow: () => alert("Trying AI Art Generator...")
          },
          {
            url: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300",
            alt: "Design Template",
            onTryNow: () => alert("Trying Design Template...")
          },
          {
            url: "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=300",
            alt: "Creative Layout",
            onTryNow: () => alert("Trying Creative Layout...")
          },
          {
            url: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300",
            alt: "Modern Design",
            onTryNow: () => alert("Trying Modern Design...")
          }
        ]
      };
    }
    
    if (lowerText.includes('help') || lowerText.includes('feature')) {
      return {
        id: Date.now() + 1,
        text: "I can help you with various tasks. Here are some options:",
        isUser: false,
        timestamp: new Date(),
        buttons: [
          {
            text: "Generate visuals",
            onClick: () => sendMessage("Generate visuals")
          },
          {
            text: "Create content",
            onClick: () => alert("Creating content...")
          },
          {
            text: "Design assistance",
            onClick: () => alert("Providing design assistance...")
          },
          {
            text: "Learn more",
            onClick: () => alert("Learning more...")
          }
        ]
      };
    }

    const responses = [
      "That's an interesting question! I'd be happy to help you with that.",
      "I understand what you're looking for. Let me provide some assistance.",
      "Great question! Here's what I can tell you about that topic.",
      "I'm here to help! Let me break that down for you.",
      "That's a good point. I can definitely assist you with that."
    ];

    return {
      id: Date.now() + 1,
      text: responses[Math.floor(Math.random() * responses.length)],
      isUser: false,
      timestamp: new Date()
    };
  };

  return {
    messages,
    isTyping,
    inputValue,
    setInputValue,
    sendMessage,
    isLoading
  };
};

// Componente principal do App
function App() {
  const { messages, isTyping, inputValue, setInputValue, sendMessage, isLoading } = useChat();
  const messagesEndRef = useRef(null);

  // Auto scroll para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
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

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.length === 0 ? (
          <EmptyState onSuggestionClick={handleSuggestionClick} />
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isUser={message.isUser}
              />
            ))}
            {isTyping && <ChatMessage isTyping={true} />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything…"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gray-100 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="w-10 h-10 bg-black hover:bg-gray-800 disabled:bg-gray-400 rounded-full flex items-center justify-center transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;