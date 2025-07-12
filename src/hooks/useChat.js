import { useState, useCallback, useRef, useEffect } from 'react';

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll para a última mensagem
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  }, [messages, isTyping]);

  const generateBotResponse = useCallback((userText) => {
    const lowerText = userText.toLowerCase();
    
    // Resposta com galeria de imagens
    if (lowerText.includes('visual') || lowerText.includes('image') || lowerText.includes('gallery') || lowerText.includes('generate')) {
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
    
    // Resposta com botões
    if (lowerText.includes('help') || lowerText.includes('feature') || lowerText.includes('what can you')) {
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

    // Resposta com exemplos
    if (lowerText.includes('example') || lowerText.includes('show me')) {
      return {
        id: Date.now() + 1,
        text: "Here are some examples of what I can do:",
        isUser: false,
        timestamp: new Date(),
        buttons: [
          {
            text: "Text generation",
            onClick: () => alert("Generating text...")
          },
          {
            text: "Image creation",
            onClick: () => sendMessage("Generate visuals")
          },
          {
            text: "Code assistance", 
            onClick: () => alert("Providing code assistance...")
          }
        ]
      };
    }

    // Respostas padrão apenas com texto
    const responses = [
      "That's an interesting question! I'd be happy to help you with that.",
      "I understand what you're looking for. Let me provide some assistance.",
      "Great question! Here's what I can tell you about that topic.",
      "I'm here to help! Let me break that down for you.",
      "That's a good point. I can definitely assist you with that.",
      "Interesting! I can help you explore that further.",
      "Let me think about that and provide you with a helpful response.",
      "That's a great topic to discuss. Here's my perspective on it."
    ];

    return {
      id: Date.now() + 1,
      text: responses[Math.floor(Math.random() * responses.length)],
      isUser: false,
      timestamp: new Date()
    };
  }, []);

  const sendMessage = useCallback(async (text) => {
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

    // Simular resposta do backend com delay realista
    const delay = 800 + Math.random() * 1200; // 0.8s a 2s
    
    setTimeout(() => {
      setIsTyping(false);
      
      const botResponse = generateBotResponse(text);
      
      // Adicionar referência ao sendMessage nos botões
      if (botResponse.buttons) {
        botResponse.buttons = botResponse.buttons.map(button => ({
          ...button,
          onClick: button.onClick || (() => sendMessage(button.text))
        }));
      }
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, delay);
  }, [isLoading, generateBotResponse]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setInputValue('');
    setIsLoading(false);
    setIsTyping(false);
  }, []);

  return {
    messages,
    isTyping,
    inputValue,
    setInputValue,
    sendMessage,
    isLoading,
    clearChat,
    messagesEndRef
  };
};

export default useChat;