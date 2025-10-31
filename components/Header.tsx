
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-6 border-b border-gray-700">
      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
        AI Skybox Generator
      </h1>
      <p className="text-gray-400 mt-2">Create seamless skyboxes for Unity using AI</p>
    </header>
  );
};

export default Header;
