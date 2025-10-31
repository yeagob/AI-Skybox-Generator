import React from 'react';
import { SkyboxImages, SkyboxFace } from '../types';

interface SkyboxPreviewProps {
  images: SkyboxImages;
  panorama: string | null;
}

const Face: React.FC<{ face: SkyboxFace; src?: string; gridClass: string }> = ({ face, src, gridClass }) => (
  <div className={`relative ${gridClass}`}>
    {src ? (
      <img src={src} alt={face} className="w-full h-full object-cover rounded-md border border-gray-700" />
    ) : (
      <div className="w-full h-full bg-gray-800 rounded-md border border-gray-700 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-600 border-dashed rounded-full animate-spin"></div>
      </div>
    )}
    <div className="absolute bottom-1 right-2 text-xs font-bold text-white bg-black bg-opacity-50 px-1 rounded">
      {face}
    </div>
  </div>
);

const SkyboxPreview: React.FC<SkyboxPreviewProps> = ({ images, panorama }) => {
  return (
    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 space-y-4">
      {panorama && (
        <div>
          <h4 className="text-lg font-semibold mb-2 text-center text-gray-300">Generated Panorama</h4>
          <img src={panorama} alt="Generated 360 Panorama" className="w-full h-auto object-contain rounded-md border border-gray-700"/>
        </div>
      )}
      <h3 className="text-xl font-semibold text-center">Cubemap Faces</h3>
      <div className="aspect-[4/3] grid grid-cols-4 grid-rows-3 gap-1">
        <Face face={SkyboxFace.Up} src={images.Up} gridClass="col-start-2" />
        <Face face={SkyboxFace.Left} src={images.Left} gridClass="row-start-2" />
        <Face face={SkyboxFace.Front} src={images.Front} gridClass="row-start-2 col-start-2" />
        <Face face={SkyboxFace.Right} src={images.Right} gridClass="row-start-2 col-start-3" />
        <Face face={SkyboxFace.Back} src={images.Back} gridClass="row-start-2 col-start-4" />
        <Face face={SkyboxFace.Down} src={images.Down} gridClass="row-start-3 col-start-2" />
      </div>
    </div>
  );
};

export default SkyboxPreview;
