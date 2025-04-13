import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import ReactMarkdown from 'react-markdown';
import './chat.css'

const Chat = forwardRef(({ chatColor }, userChatRef) => {
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useImperativeHandle(userChatRef, () => ({
    addMessage: (text, senderIsUser) => {
      const sender = senderIsUser ? 'user' : 'bot';
      setMessages((prev) => [...prev, { sender, text }]);
    },
  }));

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="w-4/5 flex flex-col gap-4 p-10 rounded-lg space-y-2 text-white overflow-auto scrollbar-hide max-h-[75vh]">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-4 font-medium w-full rounded-t-3xl text-[20px] text-semibold border-1 shadow-[12px_12px_20px_rgba(0,0,0,0.4)] 
            ${msg.sender === 'user' ? 'text-left text-black mr-10 rounded-br-3xl border-[#808080]' : 
              'text-right text-white bg-[#202020] ml-10 rounded-bl-3xl border-[#3d3d3d]'}
          `}
          style={msg.sender === 'user' ? { backgroundColor: `${chatColor}` } : {}}
        >
          <ReactMarkdown>{msg.text}</ReactMarkdown>
        </div>
      ))}
      {/* Invisible div to scroll to */}
      <div ref={bottomRef} />
    </div>
  );
});

export default Chat;


