import React from 'react';
import Icon from './Icon';

const Instructions: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Icon type="info" className="w-7 h-7 mr-3 text-blue-400" />
            Cómo usar en Unity
        </h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-300">
            <li>
                Descomprime el archivo <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">.zip</code> e importa las 6 imágenes (Right, Left, Up, Down, Front, Back) a la carpeta de <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Assets</code> de tu proyecto de Unity.
            </li>
            <li>
                Selecciona las 6 imágenes y, en la ventana del Inspector, establece lo siguiente:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-gray-400">
                    <li><code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Texture Type</code>: Default</li>
                    <li><code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">sRGB (Color Texture)</code>: On (Activado)</li>
                    <li><code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Wrap Mode</code>: Clamp</li>
                    <li><code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Filter Mode</code>: Trilinear</li>
                    <li><code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Compression</code>: None</li>
                </ul>
                Luego, haz clic en el botón <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Apply</code>.
            </li>
            <li>
                En la carpeta de <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Assets</code>, crea un nuevo Material. (Clic derecho &gt; <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Create</code> &gt; <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Material</code>) y nómbralo <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Skybox</code>.
            </li>
            <li>
                En el Inspector del nuevo Material, cambia el <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Shader</code> a <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Skybox/6 Sided</code>.
            </li>
            <li>
                Asigna cada una de las 6 imágenes a su ranura correspondiente en el material (Front, Back, Left, Right, Up, Down).
            </li>
            <li>
                Abre la ventana de iluminación en <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Window &gt; Rendering &gt; Lighting</code>.
            </li>
            <li>
                En la ventana de Lighting, ve a la pestaña <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Environment</code>.
            </li>
            <li>
                Arrastra tu nuevo material de Skybox desde la carpeta de Assets a la ranura <code className="bg-gray-700 text-teal-300 px-1 rounded text-sm">Skybox Material</code>. ¡Tu escena ahora usará el nuevo skybox!
            </li>
        </ol>
    </div>
  );
};

export default Instructions;