// HydrationDebugger.tsx
"use client";

import { useEffect } from "react";

export function HydrationDebugger() {
	useEffect(() => {
		if (typeof window !== "undefined") {
			console.log("🔍 Starting hydration error detection...");

			// Store original console methods
			const originalError = console.error;
			const originalWarn = console.warn;

			// Override console.error to catch hydration errors
			console.error = (...args) => {
				// Check for hydration errors in the message
				const errorMessage = args[0]?.toString?.() || "";
				if (
					errorMessage.includes("Hydration") ||
					errorMessage.includes("hydration") ||
					errorMessage.includes("mismatch")
				) {
					console.log("🚨 Hydration Error Detected!");
					console.log("Error details:", args);
					console.log("Component stack trace:");
					console.trace();

					// Try to extract component name from error
					const match = errorMessage.match(/in `(.+?)`/);
					if (match) {
						console.log("Problematic component:", match[1]);
					}

					// Log current DOM state
					console.log("Current DOM state:", document.body.innerHTML);
				}

				// Call original error method
				originalError.apply(console, args);
			};

			// Override console.warn to catch hydration warnings
			console.warn = (...args) => {
				const warnMessage = args[0]?.toString?.() || "";
				if (
					warnMessage.includes("Hydration") ||
					warnMessage.includes("hydration") ||
					warnMessage.includes("mismatch")
				) {
					console.log("⚠️ Hydration Warning Detected!");
					console.log("Warning details:", args);
					console.trace();
				}

				// Call original warn method
				originalWarn.apply(console, args);
			};

			// Cleanup function
			return () => {
				console.error = originalError;
				console.warn = originalWarn;
			};
		}
	}, []);

	return null;
}
