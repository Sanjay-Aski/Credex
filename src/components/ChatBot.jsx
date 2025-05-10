import { useState, useEffect, useRef } from 'react';

function ChatBot({ darkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! 👋 I'm the SoftSell AI assistant. How can I help you with selling your software licenses today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const predefinedQuestions = [
    "How do I sell my license?",
    "What types of licenses can I sell?",
    "How long does the process take?",
    "Is it secure?"
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }]);
    
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuestionClick = (question) => {
    setInputValue(question);
    // Focus the input after setting the question
    document.getElementById('chat-input').focus();
  };

  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('sell') && (lowerInput.includes('license') || lowerInput.includes('how'))) {
      return "Selling your license is easy! Just follow these steps: 1) Submit your license details via the form above, 2) Receive our valuation within 24 hours, 3) Accept the offer, and 4) Get paid within 48 hours. Would you like to start the process now?";
    } 
    else if (lowerInput.includes('type') && lowerInput.includes('license')) {
      return "We purchase a wide range of software licenses including enterprise applications, desktop software, SaaS subscriptions, cloud services, and more. You can specify your license type when you fill out our contact form above.";
    }
    else if (lowerInput.includes('long') || lowerInput.includes('time') || lowerInput.includes('process')) {
      return "The entire process typically takes 3-5 business days. License valuation occurs within 24 hours, and payment is processed within 48 hours after you accept our offer.";
    }
    else if (lowerInput.includes('secure') || lowerInput.includes('safe') || lowerInput.includes('protect')) {
      return "Absolutely! Security is our top priority. We use industry-leading encryption for all communications, follow strict compliance procedures, and never share your information with third parties without your consent.";
    }
    else if (lowerInput.includes('payment') || lowerInput.includes('pay') || lowerInput.includes('money')) {
      return "We offer multiple secure payment methods including bank transfers, PayPal, and cryptocurrency options for maximum flexibility and security.";
    }
    else {
      return "Thanks for your message. A member of our team will review your query and get back to you shortly. If you have an urgent question, you might find an answer in our FAQ section or by trying one of the suggested questions below.";
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed z-30 bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center 
        ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white 
        transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Open chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
      
      {/* Chat Window */}
      <div 
        className={`fixed z-30 bottom-6 right-6 w-80 sm:w-96 rounded-lg shadow-xl overflow-hidden 
        ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} 
        transition-all duration-300 transform ${isOpen ? 'scale-100' : 'scale-0 opacity-0'} flex flex-col`}
        style={{ height: '500px', maxHeight: '75vh' }}
      >
        {/* Chat Header */}
        <div className={`px-4 py-3 ${darkMode ? 'bg-gray-900' : 'bg-blue-600 text-white'} flex justify-between items-center`}>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center mr-2">
              <span className="text-sm">AI</span>
            </div>
            <div>
              <h3 className="font-semibold text-sm">SoftSell Assistant</h3>
              <p className="text-xs opacity-80">Online</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="rounded-full hover:bg-black hover:bg-opacity-20 p-1"
            aria-label="Close chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* Chat Messages */}
        <div className={`flex-1 p-4 overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          {messages.map(message => (
            <div 
              key={message.id}
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-3/4 p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? darkMode 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-600 text-white' 
                    : darkMode 
                      ? 'bg-gray-700' 
                      : 'bg-white'
                } ${message.sender === 'bot' ? 'slide-in' : 'scale-in'}`}
              >
                <p className={`text-sm ${message.sender === 'bot' && darkMode ? 'text-gray-200' : ''}`}>{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                  {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start mb-4 slide-in">
              <div className={`max-w-3/4 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '400ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Suggested Questions */}
        <div className={`p-3 border-t ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'}`}>
          <p className="text-xs mb-2 font-medium">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {predefinedQuestions.map((question, index) => (
              <button 
                key={index} 
                onClick={() => handleQuestionClick(question)}
                className={`text-xs px-3 py-1 rounded-full ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-900' 
                    : 'bg-gray-200 hover:bg-gray-300'
                } transition-colors`}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
        
        {/* Chat Input */}
        <div className={`p-3 border-t flex items-center ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
          <input
            id="chat-input"
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className={`flex-1 ${
              darkMode 
                ? 'bg-gray-600 text-white placeholder-gray-400 border-gray-600' 
                : 'bg-gray-100 border-gray-300'
            } border rounded-l-lg px-4 py-2 focus:outline-none`}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className={`px-4 py-2 rounded-r-lg ${
              !inputValue.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : darkMode
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition-colors`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}


export default ChatBot;