import React, { createContext, useState, useEffect } from 'react';

// Create the Consent Context
const ConsentContext = createContext();

export const ConsentProvider = ({ children }) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    // Check if the user has already accepted from localStorage
    const consent = localStorage.getItem('aiConsent');
    if (consent === 'true') {
      setIsAccepted(true);
      setIsModalOpen(false);
    }
  }, []);

  const acceptConsent = () => {
    setIsAccepted(true);
    setIsModalOpen(false);
    // Save user consent in localStorage
    localStorage.setItem('aiConsent', 'true');
  };

  return (
    <ConsentContext.Provider value={{ isAccepted, acceptConsent }}>
      {children}
      {isModalOpen && <ConsentModal onAccept={acceptConsent} />}
    </ConsentContext.Provider>
  );
};

// Modal to inform the user about the AI purpose
const ConsentModal = ({ onAccept }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Important Notice</h2>
        <p className="mb-4">
          This AI specializes in solving aptitude questions. Please do not use
          it for other purposes.
        </p>
        <p className="mb-4 text-red-500 font-semibold">
          Note: Chat history is not saved. Once the chat is closed, willingly or
          unwillingly, the conversation cannot be retrieved.
        </p>
        <button
          onClick={onAccept}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          OK, I Understand
        </button>
      </div>
    </div>
  );
};

export default ConsentContext;
