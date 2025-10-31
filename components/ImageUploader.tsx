
import React, { useCallback } from 'react';
import Icon from './Icon';

interface ImageUploaderProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ files, onFilesChange }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFilesChange([...files, ...Array.from(event.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  // FIX: Corrected DragEvent handler to use HTMLLabelElement type for the label element.
  const onDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      onFilesChange([...files, ...Array.from(event.dataTransfer.files)]);
      event.dataTransfer.clearData();
    }
  }, [files, onFilesChange]);

  // FIX: Corrected DragEvent handler to use HTMLLabelElement type for the label element.
  const onDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };


  return (
    <div className="space-y-4">
      <label
        htmlFor="file-upload"
        className="relative block w-full p-8 text-center border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <div className="flex flex-col items-center justify-center">
          <Icon type="upload" className="w-12 h-12 text-gray-500" />
          <span className="mt-2 block text-sm font-semibold text-gray-300">
            Upload reference image(s)
          </span>
          <span className="block text-xs text-gray-500">
            PNG, JPG, GIF up to 10MB
          </span>
        </div>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          multiple
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
      </label>

      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt={`preview ${index}`}
                className="w-full h-24 object-cover rounded-md"
              />
              <button
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <Icon type="trash" className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
