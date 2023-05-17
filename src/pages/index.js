import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [colors, setColors] = useState(null);
  const [url, setUrl] = useState(null);

  const getColors = async () => {
    const response = await fetch(`/api/get-colors?url=${url}`);
    const data = await response.json();
    setColors(data.color);
  };

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const handleClick = () => {
    getColors();
  };

  return (
    <main>
      <div>
        <input
          placeholder="Paste link here"
          onChange={(text) => handleChange(text)}
        ></input>
        <button onClick={() => handleClick()}>Get Colors</button>
        {colors ? (
          <div className="flex flex-row gap-2">
            <img src={url}></img>
            <div
              className="h-20 w-20 rounded-md"
              style={{ backgroundColor: colors.vibrant }}
            ></div>
            <div
              className="h-20 w-20 rounded-md"
              style={{ backgroundColor: colors.lightVibrant }}
            ></div>
            <div
              className="h-20 w-20 rounded-md"
              style={{ backgroundColor: colors.darkVibrant }}
            ></div>
            <div
              className="h-20 w-20 rounded-md"
              style={{ backgroundColor: colors.muted }}
            ></div>
            <div
              className="h-20 w-20 rounded-md"
              style={{ backgroundColor: colors.lightMuted }}
            ></div>
            <div
              className="h-20 w-20 rounded-md"
              style={{ backgroundColor: colors.darkMuted }}
            ></div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
