"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { TiHome } from "react-icons/ti";
import { FaGithub } from "react-icons/fa";
import { IoGridSharp } from "react-icons/io5";
import { MdChat } from "react-icons/md";
import { BiMailSend } from "react-icons/bi";

export const navItems = [
	{ name: "Home", link: "/", icon: <TiHome className='h-4 w-4 text-cyan-400' /> },
	{ name: "Work", link: "#projects", icon: <IoGridSharp className='h-4 w-4 text-cyan-400' /> },
	{ name: "Clients", link: "#testimonials", icon: <MdChat className='h-4 w-4 text-cyan-400' /> },
	{ name: "GitHub", link: "#github", icon: <FaGithub className='h-4 w-4 text-cyan-400' /> },
	{ name: "Contact", link: "#contact", icon: <BiMailSend className='h-4 w-4 text-cyan-400' /> },
];

interface NavItem {
	name: string;
	link: string;
	icon?: JSX.Element;
}

interface FloatingNavProps {
	navItems: NavItem[];
	className?: string;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ navItems, className }) => {
	const { scrollYProgress } = useScroll();
	const [visible, setVisible] = useState(false);

	useMotionValueEvent(scrollYProgress, "change", (current) => {
		if (typeof current === "number") {
			const direction = current - scrollYProgress.getPrevious()!;

			if (scrollYProgress.get() < 0.05) {
				setVisible(false);
			} else {
				setVisible(direction < 0);
			}
		}
	});

	return (
		<AnimatePresence mode='wait'>
			<motion.div
				initial={{ opacity: 1, y: -100 }}
				animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
				transition={{ duration: 0.2 }}
				className={cn(
					"flex max-w-fit fixed top-6 inset-x-0 mx-auto border rounded-full bg-[#050a18]/90 backdrop-blur-md shadow-lg z-[5000] px-6 py-3 items-center justify-center gap-1 border-white/[0.08]",
					className,
				)}>
				{navItems.map((navItem, idx) => (
					<Link
						key={navItem.link} // Use navItem.link for unique keys
						href={navItem.link}
						className={cn(
							"relative font-medium items-center flex space-x-1 text-slate-400 hover:text-cyan-400 transition-colors px-2",
						)}>
						<span className='block sm:hidden'>{navItem.icon}</span>
						<span className='hidden sm:block text-xs tracking-wide'>{navItem.name}</span>
					</Link>
				))}
			</motion.div>
		</AnimatePresence>
	);
};
