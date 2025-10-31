
import { SkyboxFace } from './types';

export const SKYBOX_FACES: SkyboxFace[] = [
  SkyboxFace.Front,
  SkyboxFace.Back,
  SkyboxFace.Left,
  SkyboxFace.Right,
  SkyboxFace.Up,
  SkyboxFace.Down,
];

export const SKYBOX_FACE_PROMPTS: { [key in SkyboxFace]: string } = {
    [SkyboxFace.Front]: 'Front view (+Z)',
    [SkyboxFace.Back]: 'Back view (-Z)',
    [SkyboxFace.Left]: 'Left view (-X)',
    [SkyboxFace.Right]: 'Right view (+X)',
    [SkyboxFace.Up]: 'Up view, the sky (+Y)',
    [SkyboxFace.Down]: 'Down view, the ground (-Y)',
}
