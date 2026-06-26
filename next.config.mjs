/** @type {import('next').NextConfig} */
const nextConfig = {
	// output: "export",
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		unoptimized: true,
		domains: [
			"api.microlink.io", // Microlink Image Preview
		],
		loader: "custom",
		loaderFile: "./image-loader.js",
	},
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				fs: false,
				net: false,
				tls: false,
			};
		}

		config.resolve.alias = {
			...config.resolve.alias,
			"react-icons/bs": "@react-icons/all-files/bs",
		};

		return config;
	},
};

export default nextConfig;
