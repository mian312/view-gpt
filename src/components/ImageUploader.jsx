import React, { useRef } from 'react';
import { FaCamera, FaUpload } from 'react-icons/fa';

const ImageUploader = ({ onImageUpload }) => {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleCameraCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="border-dashed border-2 border-gray-300 rounded-lg p-8 mb-6 text-center">
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-lg transition duration-300 flex items-center max-sm:text-sm"
        >
          <FaUpload className="m-2" /> Upload
        </button>
        <button
          onClick={() => cameraInputRef.current.click()}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center max-sm:text-sm"
        >
          <FaCamera className="m-2" /> Capture
        </button>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        ref={fileInputRef}
        className="hidden"
      />
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCameraCapture}
        ref={cameraInputRef}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
