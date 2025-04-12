import React, { useState, forwardRef, useImperativeHandle } from 'react';

const Chat = forwardRef((props, userChatRef, listening) => {
  const [messages, setMessages] = useState([]);

  useImperativeHandle(userChatRef, () => ({
    addMessage: (text, senderIsUser) => {
      const sender = senderIsUser ? 'user' : 'bot';
      setMessages((prev) => [...prev, { sender, text }]);
    },
  }));

  return (
    <div className="w-full  p-4  rounded-lg space-y-2 text-white">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-4 font-medium rounded-3xl text-[20px] text-semibold border-gray-500 border-1 shadow-[12px_12px_20px_rgba(0,0,0,0.4)]
            ${index % 2 === 0 ? 'bg-[#F7971D]  text-black text-left' : 'bg-gray-800 text-right text-white'} 
            ${msg.sender === 'user' ? 'text-right' : 'bg-gray-700'}`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
});

export default Chat;
