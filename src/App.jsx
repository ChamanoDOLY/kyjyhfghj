import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Componente principal do App
function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll automático para a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simula resposta do backend
  const simulateBackendResponse = (userMessage) => {
    const responses = [
      {
        type: 'text',
        content: 'Olá! Como posso ajudá-lo hoje? Posso gerar visuais, responder perguntas ou mostrar uma galeria de imagens.'
      },
      {
        type: 'text_with_buttons',
        content: 'Aqui estão algumas opções que posso oferecer:',
        buttons: [
          { text: 'Generate visuals', action: 'generate_visuals' },
          { text: 'Show gallery', action: 'show_gallery' },
          { text: 'Get help', action: 'get_help' }
        ]
      },
      {
        type: 'gallery',
        content: 'Aqui está uma galeria de imagens para você:',
        images: [
          {
            url: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=300',
            title: 'Design Moderno'
          },
          {
            url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300',
            title: 'Interface Limpa'
          },
          {
            url: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=300',
            title: 'UX Intuitivo'
          }
        ]
      }
    ];

    // Escolhe resposta baseada no input do usuário
    if (userMessage.toLowerCase().includes('visual') || userMessage.toLowerCase().includes('imagem')) {
      return responses[2]; // galeria
    } else if (userMessage.toLowerCase().includes('opção') || userMessage.toLowerCase().includes('ajuda')) {
      return responses[1]; // botões
    } else {
      return responses[0]; // texto simples
    }
  };

  // Envia mensagem
  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simula delay do backend
    setTimeout(() => {
      const botResponse = simulateBackendResponse(inputValue);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        ...botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  // Handle button clicks
  const handleButtonClick = (action) => {
    console.log('Button clicked:', action);
    // Aqui você pode implementar ações específicas para cada botão
  };

  // Handle Try Now clicks
  const handleTryNow = (image) => {
    console.log('Try Now clicked for:', image.title);
    // Aqui você pode implementar ações específicas para cada imagem
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <div className="header-content">
          <div className="avatar-container">
            <div className="avatar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
          <div className="header-info">
            <h1 className="chat-title">AI Assistant</h1>
            <p className="chat-status">Online</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-content">
              <div className="empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z" fill="currentColor"/>
                </svg>
              </div>
              <h2 className="empty-title">Como posso ajudá-lo hoje?</h2>
              <p className="empty-description">Digite sua pergunta abaixo e eu responderei o mais rápido possível.</p>
              
              <div className="suggestion-buttons">
                <button 
                  className="suggestion-btn"
                  onClick={() => setInputValue('Mostre-me algumas imagens')}
                >
                  Mostrar galeria
                </button>
                <button 
                  className="suggestion-btn"
                  onClick={() => setInputValue('Quais são minhas opções?')}
                >
                  Ver opções
                </button>
                <button 
                  className="suggestion-btn"
                  onClick={() => setInputValue('Preciso de ajuda')}
                >
                  Obter ajuda
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                {message.type === 'user' ? (
                  <div className="user-message">
                    <div className="message-bubble user-bubble">
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div className="bot-message">
                    <div className="bot-avatar">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div className="message-content">
                      <div className="message-bubble bot-bubble">
                        {message.content}
                      </div>
                      
                      {message.type === 'text_with_buttons' && message.buttons && (
                        <div className="button-group">
                          {message.buttons.map((button, index) => (
                            <button
                              key={index}
                              className="action-button"
                              onClick={() => handleButtonClick(button.action)}
                            >
                              {button.text}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {message.type === 'gallery' && message.images && (
                        <div className="image-gallery">
                          {message.images.map((image, index) => (
                            <div key={index} className="gallery-item">
                              <div className="image-container">
                                <img src={image.url} alt={image.title} />
                              </div>
                              <div className="image-info">
                                <h4 className="image-title">{image.title}</h4>
                                <button
                                  className="try-now-btn"
                                  onClick={() => handleTryNow(image)}
                                >
                                  Try Now
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="message bot">
                <div className="bot-message">
                  <div className="bot-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="chat-input-container">
        <div className="input-wrapper">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me anything…"
            disabled={isLoading}
            className="chat-input"
          />
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="send-button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;