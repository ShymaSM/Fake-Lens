import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import './AIAssistant.css';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I am the Fake Lens AI Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { type: 'user', text: input };
    setMessages([...messages, userMsg]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      let botResponse = 'I can help you navigate the site, understand algorithms, or check detection history.';
      if (input.toLowerCase().includes('how')) {
        botResponse = 'You can upload an image or video on the Detection page, and our AI will analyze it to see if it is real or a deepfake.';
      } else if (input.toLowerCase().includes('login') || input.toLowerCase().includes('sign')) {
        botResponse = 'You can use the Login or Create Account buttons in the navigation bar to sign in. The session is managed securely.';
      }

      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 1000);
  };

  return (
    <>
      <button className="ai-assistant-btn glow-effect" onClick={toggleChat}>
        <Bot size={24} />
      </button>

      {isOpen && (
        <div className="ai-chat-window glass-card animate-fade-in">
          <div className="ai-chat-header">
            <div className="ai-chat-title">
              <Bot size={20} className="text-gradient" />
              <h4>AI Assistant</h4>
            </div>
            <button className="icon-btn" onClick={toggleChat}>
              <X size={18} />
            </button>
          </div>
          
          <div className="ai-chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`ai-message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
          </div>
          
          <form className="ai-chat-footer" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="icon-btn">
              <Send size={18} className="text-gradient" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
