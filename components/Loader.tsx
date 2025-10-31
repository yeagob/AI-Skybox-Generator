import React from 'react';

interface LoaderProps {
  status: 'analyzing' | 'generating';
}

const statusMessages: { [key in LoaderProps['status']]: string } = {
    analyzing: "Analyzing image style...",
    generating: "Generating 360° panorama... This may take a few minutes."
}

const Loader: React.FC<LoaderProps> = ({ status }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-lg border border-gray-700 h-full">
      <div className="w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
      <p className="mt-6 text-lg text-gray-300 font-semibold">{statusMessages[status]}</p>
      <p className="mt-2 text-sm text-gray-500">Please keep this window open.</p>
    </div>
  );
};

export default Loader;
