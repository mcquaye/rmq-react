"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { TiHome } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";
import { IoGridSharp } from "react-icons/io5";
import { BsChatQuote } from "react-icons/bs";
import { BiMailSend } from "react-icons/bi";

export const navItems = [
	{
		name: "Home",
		link: "/",
		icon: <TiHome className='h-6 w-6 text-cyan-400' />,
	},
	{
		name: "About",
		link: "#about",
		icon: <FaUserCircle className='h-6 w-6 text-cyan-400' />,
	},
	{
		name: "Projects",
		link: "#projects",
		icon: <IoGridSharp className='h-6 w-6 text-cyan-400' />,
	},
	{
		name: "Testimonials",
		link: "#testimonials",
		icon: <BsChatQuote className='h-6 w-6 text-cyan-400' />,
	},
	{
		name: "Contact",
		link: "#contact",
		icon: <BiMailSend className='h-6 w-6 text-cyan-400' />,
	},
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
					"flex max-w-fit fixed top-10 inset-x-0 mx-auto border rounded-xl bg-[#050a18] shadow-md z-[5000] px-10 pl-8 py-5 items-center justify-center space-x-4 border-white/[0.2]",
					className
				)}>
				{navItems.map((navItem, idx) => (
					<Link
						key={navItem.link} // Use navItem.link for unique keys
						href={navItem.link}
						className={cn(
							"relative font-bold items-center flex space-x-1 text-gray-200 hover:text-cyan-400"
						)}>
						<span className='block sm:hidden gap-10'>{navItem.icon}</span>
						<span className='hidden sm:block text-sm'>{navItem.name}</span>
					</Link>
				))}
			</motion.div>
		</AnimatePresence>
	);
};
