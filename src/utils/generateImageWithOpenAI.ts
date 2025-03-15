import { generate } from "stability-client";

interface GenerateImageProps {
  prompt: string;
}

export async function generateImage({
  prompt,
}: GenerateImageProps): Promise<{ images: any[]; metadata: any } | null> {
  try {
    const apiKey = process.env.STABILITY_API_KEY;

    if (!apiKey) {
      throw new Error(
        "API Key is missing. Set DREAMSTUDIO_API_KEY in your environment variables.",
      );
    }

    const api = generate({ prompt, apiKey });

    const imageData: any[] = [];

    // Wrap the event listener in a Promise for better async/await handling
    return await new Promise((resolve, reject) => {
      api.on("image", ({ buffer, filePath }) => {
        console.log("Image Buffer:", buffer);
        console.log("Saved File Path:", filePath);
      });

      api.on("end", (data) => {
        console.log("Generation Complete", data);
      });

      // Handle any errors by rejecting the promise, so they can be caught by try/catch
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}
