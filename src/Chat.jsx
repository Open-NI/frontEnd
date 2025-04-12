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
          className={`p-2 text-black rounded ${index % 2 === 0 ? 'bg-[#F7971D]' : 'bg-gray-500'} ${
            msg.sender === 'user' ? 'text-right' : 'bg-gray-700 text-left'
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
});

export default Chat;
