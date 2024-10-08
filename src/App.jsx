import React, { useContext, useEffect, useState } from 'react';
import ConsentContext from './contexts/ConsentContext';
import ImageUploader from './components/ImageUploader';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import LoadingIndicator from './components/LoadingIndicator';
import RetryButton from './components/RetryButton';
import { sendImageToAPI, sendMessageToAPI } from './utils/groqApi';
import imageCompression from 'browser-image-compression';
import heic2any from 'heic2any';

const App = () => {
  const { isAccepted } = useContext(ConsentContext);

  const [selectedImage, setSelectedImage] = useState(null);
  const [evaluation, setEvaluation] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [retry, setRetry] = useState(false);

  const handleImageUpload = async (file) => {
    setIsLoading(true);
    setRetry(false);

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/heic', 'image/heif'];
    
    if (!validImageTypes.includes(file.type)) {
      console.error('Invalid file type. Please upload a JPEG, PNG, or GIF image.');
      setIsLoading(false);
      return;
    }

    try {
      let processedFile = file;

      // Convert HEIC/HEIF images to JPEG
      if (file.type === 'image/heic' || file.type === 'image/heif') {
        processedFile = await heic2any({ blob: file, toType: 'image/jpeg' });
      }

      // Compress the image
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(processedFile, options);

      const reader = new FileReader();
      reader.onload = async () => {
        const base64Image = reader.result;
        setSelectedImage(base64Image);
        try {
          const evaluationResult = await sendImageToAPI(base64Image);
          setEvaluation(evaluationResult);
        } catch (error) {
          console.error('Error processing the image:', error);
          setRetry(true);
        } finally {
          setIsLoading(false);
        }
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        setIsLoading(false);
        setRetry(true);
      };

      reader.readAsDataURL(compressedFile);

    } catch (error) {
      console.error('Error during image processing:', error);
      setIsLoading(false);
      setRetry(true);
    }
  };

  const handleSendMessage = async (message, sender = 'user') => {
    setMessages((prevMessages) => [...prevMessages, { text: message, sender }]);
    if (sender === 'user') {
      setIsTyping(true);
      try {
        const aiResponse = await sendMessageToAPI(message);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: aiResponse, sender: 'model' },
        ]);
      } catch (error) {
        console.error('Failed to get AI response:', error);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleRetry = () => {
    if (selectedImage) {
      handleImageUpload(selectedImage);
    }
  };

  useEffect(() => {
    if (evaluation.length > 0) {
      handleSendMessage(evaluation);
    }
  }, [evaluation]);

  // Render null if consent is not accepted
  if (!isAccepted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Image Upload and AI Chat
          </h1>

          <ImageUploader onImageUpload={handleImageUpload} />

          {selectedImage && (
            <div className="mb-4 text-center">
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-full h-auto mx-auto rounded-lg"
              />
            </div>
          )}

          {isLoading && <LoadingIndicator />}
          {retry && <RetryButton onRetry={handleRetry} />}
          {/* {evaluation.length > 0 && (
            <div className="bg-gray-100 p-4 rounded-lg my-4">
              <p className="text-sm text-gray-600">{evaluation}</p>
            </div>
          )} */}

          <MessageList messages={messages.slice(1)} isLoading={isTyping} />

          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default App;
