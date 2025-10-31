import React from 'react';
import Icon from './Icon';

const Instructions: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Icon type="info" className="w-7 h-7 mr-3 text-blue-400" />
            How to Use in Unity
        </h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-300">
            <li>
                Unzip the <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">.zip</code> file and import the 6 images (Right, Left, Up, Down, Front, Back) into your Unity project's <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Assets</code> folder.
            </li>
            <li>
                Select all 6 images, and in the Inspector window, set the following:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-gray-400">
                    <li><code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Texture Type</code>: Default</li>
                    <li><code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">sRGB (Color Texture)</code>: On</li>
                    <li><code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Wrap Mode</code>: Clamp</li>
                    <li><code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Filter Mode</code>: Trilinear</li>
                    <li><code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Compression</code>: None</li>
                </ul>
                Then, click the <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Apply</code> button.
            </li>
            <li>
                In your <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Assets</code> folder, create a new Material. (Right-click &gt; <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Create</code> &gt; <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Material</code>) and name it <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Skybox</code>.
            </li>
            <li>
                In the new Material's Inspector, change the <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Shader</code> to <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Skybox/6 Sided</code>.
            </li>
            <li>
                Assign each of the 6 images to its corresponding slot in the material (Front, Back, Left, Right, Up, Down).
            </li>
            <li>
                Open the Lighting window via <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Window &gt; Rendering &gt; Lighting</code>.
            </li>
            <li>
                In the Lighting window, navigate to the <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Environment</code> tab.
            </li>
            <li>
                Drag your new Skybox material from the Assets folder to the <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Skybox Material</code> slot. Your scene will now use the new skybox!
            </li>
        </ol>
    </div>
  );
};

export default Instructions;
