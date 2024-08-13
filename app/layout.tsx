import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

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
		</html>
	);
}
