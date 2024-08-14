import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const fontSans = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "RMQ",
	description: "Wholly Known As RMQ Creative - We do more than just brand your product.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={cn("min-h-screen font-sans antialiased", `${fontSans.variable}`)}>
				{children}
			</body>
			<GoogleTagManager gtmId='GT-5M88LLHB' />
			<GoogleAnalytics gaId='G-QY1SLK8YKG' />
		</html>
	);
}
