import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const MessageInput = ({ onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="flex">
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend}
        placeholder="Type your message..."
        className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-r-lg transition duration-300 flex items-center max-sm:text-sm"
      >
        <FaPaperPlane className="m-2" /> 
        <p className='max-sm:hidden'>Send</p>
      </button>
    </div>
  );
};

export default MessageInput;
