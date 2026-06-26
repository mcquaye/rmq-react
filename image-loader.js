export default function imageLoader({ src, width, quality }) {
	// Handle absolute URLs (including those from api.microlink.io)
	if (src.startsWith("http")) {
		return src;
	}

	// Handle relative URLs
	const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";

	// If quality is provided, add it to the URL
	const qualityParam = quality ? `&q=${quality}` : "";

	// Construct the final URL with width and quality parameters
	return `${baseURL}${src}?w=${width}${qualityParam}`;
}

// Export additional configuration if needed
export const loaderConfig = {
	// Add any loader-specific configuration here
	minimumCacheTTL: 60,
	deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
	imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	formats: ["image/webp"],
};
