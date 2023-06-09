import Vibrant from "node-vibrant";
import sharp from "sharp";

export default async function handler(req, res) {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    return res.status(400).json({ error: "Missing image URL" });
  }

  try {
    //const convertedImageUrl = await convertToPNG(imageUrl);
    const color = await getColorFromImage(imageUrl);
    res.status(200).json({ color });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error processing the image" });
  }
}

async function convertToPNG(imageUrl) {
  const convertedImageBuffer = await sharp(imageUrl).toFormat("png").toBuffer();
  const convertedImageUrl = `data:image/png;base64,${convertedImageBuffer.toString(
    "base64"
  )}`;
  return convertedImageUrl;
}

async function getColorFromImage(imageUrl) {
  const palette = await Vibrant.from(imageUrl).getPalette();
  const dominantColor =
    palette.DarkMuted ||
    palette.LightMuted ||
    palette.DarkVibrant ||
    palette.Muted ||
    palette.Vibrant ||
    palette.LightVibrant;

  const colorObject = {
    vibrant: palette.Vibrant.hex,
    lightVibrant: palette.LightVibrant.hex,
    darkVibrant: palette.DarkVibrant.hex,
    muted: palette.Muted.hex,
    lightMuted: palette.LightMuted.hex,
    darkMuted: palette.DarkMuted.hex,
    dominant: dominantColor.hex,
  };

  return colorObject;
}
