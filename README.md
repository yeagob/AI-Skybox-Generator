# AI Skybox Generator for Unity

An AI-powered web application that generates seamless, 6-sided skyboxes for Unity. Create stunning 360° environments by providing a text prompt and/or uploading reference images. The tool uses the Gemini API to generate a panoramic image, converts it into a cubemap, and allows you to preview and download the skybox faces as a ZIP file, ready for your Unity project.

## ✨ Features

-   **Text-to-Skybox**: Describe any scene you can imagine, from a "serene fantasy forest at dawn" to a "cyberpunk city in a neon-drenched rain," and watch the AI bring it to life.
-   **Image Style Reference**: Upload one or more reference images to guide the AI on the desired artistic style, color palette, and mood.
-   **Hybrid Generation**: Combine a text prompt with reference images for precise control over both the scene's content and its aesthetic.
-   **Live Cubemap Preview**: Instantly see how your generated panorama translates into the six faces of a skybox (Front, Back, Up, Down, Left, Right).
-   **One-Click Download**: Get a ready-to-use `.zip` file containing all six skybox images, correctly named for easy use.
-   **Built-in Unity Guide**: The application includes a step-by-step guide on how to import and set up your new skybox material in Unity.

## ⚙️ How It Works

The generator follows a sophisticated multi-step process to create your skybox:

1.  **Prompt Analysis & Combination**:
    -   You provide a text prompt and/or reference images.
    -   If reference images are uploaded, the **Gemini 2.5 Flash** model analyzes them to create a detailed, descriptive prompt capturing the artistic style, lighting, and composition.
    -   This style description is intelligently combined with your text prompt to form a final, comprehensive prompt.

2.  **Panorama Generation**:
    -   The final prompt is sent to the **Imagen 4 Ultra** model, a powerful image generation model, to create a high-resolution, seamless 360° equirectangular panoramic image.

3.  **Client-Side Cubemap Conversion**:
    -   Once the panorama is generated, a client-side JavaScript algorithm maps the equirectangular projection onto the six faces of a cube. This process calculates the correct perspective for each face, ensuring a seamless transition in the 3D environment.

4.  **Packaging & Download**:
    -   The six generated face images are bundled into a `.zip` archive using JSZip, allowing for a quick and convenient download.

## 🚀 How to Use

1.  **Provide Your Vision**: In the "Text Prompt" box, describe the skybox you want to create. Be as descriptive as possible!
2.  **(Optional) Upload Style References**: Drag and drop or click to upload one or more images that define the artistic style you're aiming for.
3.  **Generate**: Click the **Generate Skybox** button. The process may take a few minutes as the AI works its magic. The status will update from "Analyzing..." to "Generating...".
4.  **Preview**: Once finished, the generated 360° panorama and the six individual cubemap faces will appear in the preview area.
5.  **Download**: If you're happy with the result, click **Download Skybox (.zip)** to save the image files to your computer.
6.  **Start Over**: Click "Start Over" to clear the inputs and generate a new skybox.

## 🕹️ Unity Integration Guide

Getting your new skybox into your Unity project is simple:

1.  **Import Assets**: Unzip the downloaded file and drag the six images (front, back, left, right, up, down) into your Unity project's `Assets` folder.
2.  **Create Material**: In the `Assets` folder, right-click and go to `Create > Material`. Name it something like `MySkybox_Mat`.
3.  **Set Shader**: Select the new material. In the Inspector window, click the `Shader` dropdown and select `Skybox/6 Sided`.
4.  **Assign Textures**: You will now see six texture slots in the Inspector. Drag each of your imported images to its corresponding slot (e.g., `skybox_front.png` to the `Front (+Z)` slot).
5.  **Apply to Scene**: Open the Lighting window by going to `Window > Rendering > Lighting`. In the `Environment` tab, drag your new skybox material from the `Assets` folder into the `Skybox Material` slot.

Your scene will now be illuminated by your custom, AI-generated skybox!

## 🛠️ Tech Stack

-   **Frontend**: React, TypeScript, Tailwind CSS
-   **AI Models**:
    -   Google Gemini 2.5 Flash (for image style analysis)
    -   Google Imagen 4 Ultra (for panorama generation)
-   **Libraries**:
    -   `@google/genai` for interacting with the Gemini API.
    -   `JSZip` for creating the downloadable archive.

## License

This project is licensed under the MIT License.