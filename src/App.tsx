import { useState, useEffect } from 'react';

function App() {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [hexColor, setHexColor] = useState('#ffffff');

  useEffect(() => {
    setHexColor(hslToHex(hue, saturation, lightness));
  }, [hue, saturation, lightness]);

  const hslToHex = (h: number, s: number, l: number): string => {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    // Prefix 0 if the component is one digit
    return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hexColor);
    alert('Copied the color code ' + hexColor + ' to clipboard!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">HSL Color Picker</h1>

      <div className="mb-4">
        <div
          className="w-32 h-32 rounded-full shadow-md"
          style={{ backgroundColor: hexColor }}
        ></div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hue">Hue (0-360):</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="range"
          id="hue"
          min="0"
          max="360"
          value={hue}
          onChange={(e) => setHue(parseInt(e.target.value))}
        />
        <p>Value: {hue}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="saturation">Saturation (0-100):</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="range"
          id="saturation"
          min="0"
          max="100"
          value={saturation}
          onChange={(e) => setSaturation(parseInt(e.target.value))}
        />
        <p>Value: {saturation}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lightness">Lightness (0-100):</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="range"
          id="lightness"
          min="0"
          max="100"
          value={lightness}
          onChange={(e) => setLightness(parseInt(e.target.value))}
        />
        <p>Value: {lightness}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hex">Hex Color:</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="hex"
          value={hexColor}
          readOnly
        />
      </div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={copyToClipboard}>
        Copy to Clipboard
      </button>
    </div>
  );
}

export default App;
