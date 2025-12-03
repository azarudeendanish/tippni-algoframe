// src/utils/compressImage.ts
import imageCompression from "browser-image-compression";

/**
 * Compress an image to under 10 KB (approx) using multiple passes.
 */
export async function compressToUnder10KB(file: File): Promise<File> {
  let resized = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 300,
    initialQuality: 0.6,
    useWebWorker: true,
  });

  let quality = 0.5;

  while (resized.size > 10 * 1024 && quality > 0.05) {
    resized = await imageCompression(resized, {
      maxSizeMB: 1,
      maxWidthOrHeight: 300,
      initialQuality: quality,
      useWebWorker: true,
    });

    quality -= 0.1;
  }

  return resized;
}

/**
 * Format file size for logging.
 */
export const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes.toFixed(2)} KB`;
  return `${(bytes / 1024).toFixed(2)} MB`;
};
