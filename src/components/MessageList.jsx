import React from 'react';

const MessageList = ({ messages, isLoading }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-6 h-64 overflow-y-auto flex flex-col">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
        >
          <span
            className={`inline-block p-2 rounded-lg ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-800'
            }`}
          >
            {message.text}
          </span>
        </div>
      ))}
      {isLoading && (
        <div className="text-left mb-2">
          <span className="inline-block p-2 rounded-lg bg-gray-300 text-gray-800">
            AI is typing...
          </span>
        </div>
      )}
    </div>
  );
};

export default MessageList;
