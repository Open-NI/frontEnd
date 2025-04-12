import React, { useState, forwardRef, useImperativeHandle } from 'react';

const Chat = forwardRef((props, ref) => {
  const [messages, setMessages] = useState([]);

  useImperativeHandle(ref, () => ({
    addMessage: (text, senderIsUser) => {
      const sender = senderIsUser ? 'user' : 'bot';
      setMessages((prev) => [...prev, { sender, text }]);
    },
  }));

  return (
    <div className="w-full max-w-md p-4 bg-gray-900 rounded-lg space-y-2 text-white">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-2 rounded ${
            msg.sender === 'user' ? 'bg-blue-600 text-right' : 'bg-gray-700 text-left'
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
});

export default Chat;
