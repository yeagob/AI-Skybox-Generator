import { SkyboxFace, SkyboxImages } from '../types';

const FACE_SIZE = 1024; // The resolution for each cube face

// Maps each face to its corresponding transformation vector logic
const faceTransforms: { [key in SkyboxFace]: (x: number, y: number) => [number, number, number] } = {
  [SkyboxFace.Front]: (x, y) => [x, y, 1],
  [SkyboxFace.Back]:  (x, y) => [-x, y, -1],
  [SkyboxFace.Right]: (x, y) => [1, y, -x],
  [SkyboxFace.Left]:  (x, y) => [-1, y, x],
  [SkyboxFace.Up]:    (x, y) => [x, 1, -y],
  [SkyboxFace.Down]:  (x, y) => [x, -1, y],
};

export const convertPanoramaToCubemap = (panoramaSrc: string): Promise<SkyboxImages> => {
  return new Promise((resolve, reject) => {
    const panorama = new Image();
    panorama.crossOrigin = "Anonymous";
    
    panorama.onload = () => {
      const panoramaCanvas = document.createElement('canvas');
      panoramaCanvas.width = panorama.width;
      panoramaCanvas.height = panorama.height;
      const panoramaCtx = panoramaCanvas.getContext('2d', { willReadFrequently: true });
      if (!panoramaCtx) return reject(new Error("Failed to get panorama canvas context."));
      panoramaCtx.drawImage(panorama, 0, 0);
      const panoramaData = panoramaCtx.getImageData(0, 0, panorama.width, panorama.height);
      
      const skyboxImages: Partial<SkyboxImages> = {};
      const faceCanvas = document.createElement('canvas');
      faceCanvas.width = FACE_SIZE;
      faceCanvas.height = FACE_SIZE;
      const faceCtx = faceCanvas.getContext('2d');
      if (!faceCtx) return reject(new Error("Failed to get face canvas context."));

      for (const face of Object.values(SkyboxFace)) {
        const transform = faceTransforms[face];
        const faceImageData = faceCtx.createImageData(FACE_SIZE, FACE_SIZE);
        
        for (let y = 0; y < FACE_SIZE; y++) {
          for (let x = 0; x < FACE_SIZE; x++) {
            // Normalize coordinates from [0, size] to [-1, 1]
            const nx = (2 * (x + 0.5) / FACE_SIZE) - 1;
            const ny = 1 - (2 * (y + 0.5) / FACE_SIZE); // Flipped for canvas coords
            
            // Get 3D vector for this pixel on the cube face
            let [vx, vy, vz] = transform(nx, ny);
            const len = Math.sqrt(vx * vx + vy * vy + vz * vz);
            vx /= len;
            vy /= len;
            vz /= len;
            
            // Convert 3D vector to spherical coordinates (longitude, latitude)
            const lon = Math.atan2(vz, vx);
            const lat = Math.acos(vy);
            
            // Map spherical coordinates to panorama UV coordinates
            const u = (lon / (2 * Math.PI)) + 0.5;
            const v = lat / Math.PI;
            
            // Get pixel from panorama
            const panoX = Math.floor(u * (panorama.width - 1));
            const panoY = Math.floor(v * (panorama.height - 1));
            const pIndex = (panoY * panorama.width + panoX) * 4;

            const fIndex = (y * FACE_SIZE + x) * 4;
            faceImageData.data[fIndex + 0] = panoramaData.data[pIndex + 0];
            faceImageData.data[fIndex + 1] = panoramaData.data[pIndex + 1];
            faceImageData.data[fIndex + 2] = panoramaData.data[pIndex + 2];
            faceImageData.data[fIndex + 3] = 255;
          }
        }
        
        faceCtx.putImageData(faceImageData, 0, 0);
        skyboxImages[face] = faceCanvas.toDataURL('image/png');
      }
      
      resolve(skyboxImages as SkyboxImages);
    };

    panorama.onerror = (err) => {
      console.error("Failed to load panorama image for conversion.", err);
      reject(new Error("The generated panorama image could not be loaded. It might be corrupted."));
    };

    panorama.src = panoramaSrc;
  });
};
