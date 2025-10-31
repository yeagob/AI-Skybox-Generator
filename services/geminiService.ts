import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// Helper to convert file to base64 with correct format for Gemini API
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  const base64EncodedData = await base64EncodedDataPromise;
  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
};

const analyzeImageStyle = async (files: File[]): Promise<string> => {
    const imageParts = await Promise.all(files.map(fileToGenerativePart));
    const prompt = `Analyze the provided reference image(s) with extreme detail to capture their essence for a panoramic skybox generation. Your description must be a single, cohesive phrase focusing on these key aspects:
- **Aesthetics & Mood:** Describe the overall artistic style (e.g., oil painting, photorealistic, anime, watercolor), the primary mood (e.g., serene, ominous, epic, whimsical), and the color palette (e.g., vibrant greens and deep blues, muted pastels, high-contrast neons).
- **Lighting:** Describe the quality and direction of the light (e.g., soft morning light filtering through trees, harsh midday sun, ethereal glow from bioluminescent flora, dramatic sunset).
- **Compositional Elements:** Break down the scene into three distinct vertical layers:
  - **Sky:** Describe the sky (e.g., clear blue with wispy clouds, stormy and dark with lightning, alien sky with two moons).
  - **Mid-ground:** Describe the main elements at eye-level (e.g., towering ancient trees, futuristic skyscrapers, floating islands).
  - **Ground:** Describe the ground level (e.g., a tranquil water surface, cracked volcanic rock, a grassy field with flowers).
Combine these observations into a single, rich descriptive prompt. Example: 'A serene, painterly fantasy forest at dawn, with soft morning light filtering through towering, moss-covered ancient trees. The sky is a soft mix of orange and blue with wispy clouds, and the ground is a tranquil, reflective river.'`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [...imageParts, {text: prompt}] },
    });
    
    return response.text.trim();
};

const generateEquirectangularPanorama = async (stylePrompt: string): Promise<string> => {
    const prompt = `A high-resolution, 4K, seamless, 360-degree equirectangular panoramic image. The image must be perfectly seamless horizontally for use as a skybox. Faithfully and artistically reproduce the following detailed description, ensuring the colors, lighting, and aesthetic are captured precisely: **${stylePrompt}**.`;

    const response = await ai.models.generateImages({
        model: 'imagen-4.0-ultra-generate-001',
        prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio: '16:9', // Widest available aspect ratio
        },
    });

    const base64ImageBytes = response.generatedImages[0].image.imageBytes;
    return `data:image/png;base64,${base64ImageBytes}`;
};

export const generateFullSkybox = async (
    files: File[],
    textPrompt: string,
    onAnalysisComplete: () => void
): Promise<string> => {
    
    let finalPrompt = '';

    if (textPrompt.trim()) {
        finalPrompt = textPrompt.trim();
    }

    // If there are files, they can define the style, which can be combined with the text prompt.
    if (files.length > 0) {
        // Step 1: Analyze the style from reference images
        const imageStyleDescription = await analyzeImageStyle(files);
        onAnalysisComplete(); // Callback to update UI state from 'analyzing' to 'generating'

        if (finalPrompt) {
            // Both text and images are provided. Combine them.
            finalPrompt = `${finalPrompt}, in the artistic style of: ${imageStyleDescription}`;
        } else {
            // Only images are provided. The analyzed style becomes the full prompt.
            finalPrompt = imageStyleDescription;
        }
    }
    
    if (!finalPrompt) {
        throw new Error("A text prompt or reference images must be provided.");
    }

    // Step 2: Generate a single panoramic image using the final combined prompt
    const panoramaImage = await generateEquirectangularPanorama(finalPrompt);

    return panoramaImage;
};