
export enum SkyboxFace {
  Front = 'Front', // +Z
  Back = 'Back',   // -Z
  Left = 'Left',   // -X
  Right = 'Right', // +X
  Up = 'Up',     // +Y
  Down = 'Down',   // -Y
}

export type SkyboxImages = {
  [key in SkyboxFace]?: string; // base64 data URL
};

export type GenerationState = 'idle' | 'analyzing' | 'generating' | 'success' | 'error';
