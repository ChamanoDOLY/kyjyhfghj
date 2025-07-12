import React from 'react';
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
    isLoading,
    messagesEndRef
  } = useChat();

  // Handler para sugestões do estado vazio
  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  // Handler para envio de mensagem
  const handleSendMessage = (text) => {
    sendMessage(text);
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <ChatHeader />

      {/* Messages Area */}
      <div className="messages-container">
        {messages.length === 0 ? (
          <EmptyState onSuggestionClick={handleSuggestionClick} />
        ) : (
          <div className="messages-list">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isUser={message.isUser}
              />
            ))}
            {isTyping && <ChatMessage isTyping={true} />}
            <div ref={messagesEndRef} />
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