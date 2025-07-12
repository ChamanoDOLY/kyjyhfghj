import React, { useEffect, useRef } from 'react';
import './App.css';

// Importar componentes
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import EmptyState from './components/EmptyState';
import useChat from './hooks/useChat';

function App() {
  const { 
    messages, 
    isTyping, 
    inputValue, 
    setInputValue, 
    sendMessage, 
    isLoading 
  } = useChat();
  
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Auto scroll para a última mensagem
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  }, [messages, isTyping]);

  // Handler para sugestões do estado vazio
  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  // Handler para envio de mensagem
  const handleSendMessage = (text) => {
    sendMessage(text);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <ChatHeader />

      {/* Messages Area */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-6 py-4"
        style={{ scrollBehavior: 'smooth' }}
      >
        {messages.length === 0 ? (
          <EmptyState onSuggestionClick={handleSuggestionClick} />
        ) : (
          <div className="space-y-0">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isUser={message.isUser}
              />
            ))}
            {isTyping && <ChatMessage isTyping={true} />}
            <div ref={messagesEndRef} className="h-1" />
          </div>
        )}
      </div>

      {/* Input Area */}
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSubmit={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;