import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { HydrationDebugger } from "@/components/HydrationDebugger";

const fontSans = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
	variable: "--font-sans",
});

const THEME_SCRIPT = `try{var t=localStorage.getItem("theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light"}catch(e){document.documentElement.classList.add("dark")}`;

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
		<html lang='en' suppressHydrationWarning>
			<head>
				{/* Picks the theme before the first paint: the visitor's saved choice, else their device setting */}
				<script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
			</head>
			<body className={cn("min-h-screen font-sans antialiased", `${fontSans.variable}`)}>
				<HydrationDebugger />
				{children}
				<GoogleTagManager gtmId='GT-5M88LLHB' />
				<GoogleAnalytics gaId='G-QY1SLK8YKG' />
			</body>
		</html>
	);
}
