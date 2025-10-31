import React, { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import SkyboxPreview from './components/SkyboxPreview';
import Instructions from './components/Instructions';
import Loader from './components/Loader';
import Icon from './components/Icon';
import { GenerationState, SkyboxImages } from './types';
import { generateFullSkybox } from './services/geminiService';
import { convertPanoramaToCubemap } from './utils/cubemapConverter';

declare const JSZip: any;

const App: React.FC = () => {
  const [referenceFiles, setReferenceFiles] = useState<File[]>([]);
  const [textPrompt, setTextPrompt] = useState<string>('');
  const [generationState, setGenerationState] = useState<GenerationState>('idle');
  const [panoramaImage, setPanoramaImage] = useState<string | null>(null);
  const [generatedSkybox, setGeneratedSkybox] = useState<SkyboxImages | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGenerateClick = async () => {
    if (referenceFiles.length === 0 && textPrompt.trim() === '') {
        setErrorMessage("Please describe your skybox or upload a reference image.");
        return;
    }
    setErrorMessage(null);
    setGeneratedSkybox(null);
    setPanoramaImage(null);

    if (referenceFiles.length > 0) {
        setGenerationState('analyzing');
    } else {
        setGenerationState('generating');
    }

    try {
        const panorama = await generateFullSkybox(referenceFiles, textPrompt, () => {
            setGenerationState('generating');
        });
        setPanoramaImage(panorama);

        // Now convert the panorama to cubemap faces
        const skybox = await convertPanoramaToCubemap(panorama);
        
        setGeneratedSkybox(skybox);
        setGenerationState('success');
    } catch (error) {
        console.error("Skybox generation failed:", error);
        setErrorMessage(error instanceof Error ? error.message : "An unknown error occurred during generation.");
        setGenerationState('error');
    }
  };

  const handleDownloadClick = async () => {
    if (!generatedSkybox) return;

    try {
        const zip = new JSZip();
        
        const facePromises = Object.entries(generatedSkybox).map(async ([face, dataUrl]) => {
            // FIX: Use `typeof` to narrow `dataUrl` to a string, resolving the TypeScript error.
            if (typeof dataUrl === 'string') {
                const response = await fetch(dataUrl);
                const blob = await response.blob();
                zip.file(`skybox_${face.toLowerCase()}.png`, blob);
            }
        });

        await Promise.all(facePromises);
        
        const zipBlob = await zip.generateAsync({ type: "blob" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(zipBlob);
        link.download = "Unity_Skybox.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

    } catch (error) {
        console.error("Failed to create ZIP:", error);
        setErrorMessage("Failed to prepare the download file.");
    }
  };
  
  const handleReset = () => {
    setReferenceFiles([]);
    setTextPrompt('');
    setGeneratedSkybox(null);
    setPanoramaImage(null);
    setGenerationState('idle');
    setErrorMessage(null);
  }

  const isLoading = generationState === 'analyzing' || generationState === 'generating';

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 space-y-6">
            <h2 className="text-2xl font-bold">1. Provide Your Vision</h2>
            <p className="text-gray-400 -mt-4">
              Describe the scene you want. Optionally, upload reference images for the AI to match the artistic style.
            </p>
            <div>
              <label htmlFor="text-prompt" className="block text-sm font-medium text-gray-300 mb-2">
                Text Prompt
              </label>
              <textarea
                id="text-prompt"
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
                placeholder="e.g., A vibrant, alien jungle at night with glowing plants and two moons in a starry sky, in a digital painting style."
                className="w-full h-24 p-3 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-200"
                aria-label="Skybox description"
              />
            </div>
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="flex-shrink mx-4 text-gray-400 font-semibold">AND/OR</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>
            <ImageUploader files={referenceFiles} onFilesChange={setReferenceFiles} />
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleGenerateClick}
                disabled={(referenceFiles.length === 0 && textPrompt.trim() === '') || isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Generating...' : 'Generate Skybox'}
              </button>
              {(generationState === 'success' || generationState === 'error') && (
                 <button
                    onClick={handleReset}
                    className="w-full px-6 py-3 font-semibold text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
                 >
                    Start Over
                 </button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">2. Preview & Download</h2>
            {isLoading && <Loader status={generationState} />}
            {generationState === 'success' && generatedSkybox && (
                <>
                    <SkyboxPreview images={generatedSkybox} panorama={panoramaImage} />
                    <button
                        onClick={handleDownloadClick}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors"
                    >
                        <Icon type="download" />
                        Download Skybox (.zip)
                    </button>
                </>
            )}
            {!isLoading && generationState !== 'success' && (
                <div className="flex items-center justify-center p-8 bg-gray-800 rounded-lg border-2 border-dashed border-gray-700 h-full min-h-[400px]">
                    <p className="text-gray-500">Your generated skybox will appear here.</p>
                </div>
            )}
          </div>
        </div>
        
        {errorMessage && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{errorMessage}</span>
            </div>
        )}
        
        <Instructions />
      </main>
    </div>
  );
};

export default App;