"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// The starting theme is set in app/layout.tsx before the page paints; this only flips and remembers it
export default function ThemeToggle() {
	const [isDark, setIsDark] = useState<boolean | null>(null);

	useEffect(() => {
		setIsDark(document.documentElement.classList.contains("dark"));
	}, []);

	const toggle = () => {
		const next = !isDark;
		document.documentElement.classList.toggle("dark", next);
		try {
			localStorage.setItem("theme", next ? "dark" : "light");
		} catch {}
		setIsDark(next);
	};

	return (
		<button
			type='button'
			onClick={toggle}
			aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
			className='fixed top-5 right-5 z-[5001] flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm backdrop-blur-md transition-colors hover:text-cyan-600 dark:border-white/[0.08] dark:bg-[#050a18]/90 dark:text-slate-300 dark:hover:text-cyan-400'>
			{isDark === null ? null : isDark ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
		</button>
	);
}
