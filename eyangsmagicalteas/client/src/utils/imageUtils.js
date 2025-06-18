// client/src/utils/imageUtils.js

/**
 * Generates the public path for a product tea image.
 * Assumes imageName is the filename without extension (e.g., "copperPot").
 * @param {string} imageName - The base name of the image file.
 * @returns {string} The public path to the image, or an empty string if imageName is falsy.
 */
export const getProductTeaImagePath = (imageName) => {
  if (!imageName) return "";
  // Handle cases where imageName might already be a full URL or an absolute path
  if (imageName.startsWith("http://") || imageName.startsWith("https://") || imageName.startsWith("/")) {
    return imageName;
  }
  return `/images/product_teas/${imageName}.png`;
};

/**
 * Generates the public path for a hero banner image.
 * Assumes imageName is the filename with extension (e.g., "mybanner.png")
 * or without (e.g., "mybanner", in which case .png is assumed).
 * Adjust if your hero banner images have different extensions or naming conventions.
 * @param {string} imageName - The name of the image file.
 * @returns {string} The public path to the image, or an empty string if imageName is falsy.
 */
export const getHeroBannerImagePath = (imageName) => {
  if (!imageName) return "";
  if (imageName.startsWith("http://") || imageName.startsWith("https://") || imageName.startsWith("/")) {
    return imageName;
  }
  // If imageName doesn't already have a common image extension, append .png
  // You might want to make this more robust if you have .jpg, .webp, etc.
  if (!/\.(png|jpg|jpeg|gif|webp)$/i.test(imageName)) {
    return `/images/heroBanners/${imageName}.png`;
  }
  return `/images/heroBanners/${imageName}`;
};

/**
 * Generates the public path for an offer image.
 * Similar assumptions as getHeroBannerImagePath.
 * @param {string} imageName - The name of the image file.
 * @returns {string} The public path to the image, or an empty string if imageName is falsy.
 */
export const getOfferImagePath = (imageName) => {
  if (!imageName) return "";
  if (imageName.startsWith("http://") || imageName.startsWith("https://") || imageName.startsWith("/")) {
    return imageName;
  }
  if (!/\.(png|jpg|jpeg|gif|webp)$/i.test(imageName)) {
    return `/images/offer/${imageName}.png`;
  }
  return `/images/offer/${imageName}`;
};

// Add more functions here for other image categories as needed
// e.g., getCategoryIconPath, getBlogImagePost, etc.
