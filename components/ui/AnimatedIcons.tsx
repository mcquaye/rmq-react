"use client";

import { animate, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { IoLogoAngular, IoLogoReact } from "react-icons/io5";
import {
	SiAmazonwebservices,
	SiClickup,
	SiCss3,
	SiHtml5,
	SiJira,
	SiLaravel,
	SiNextdotjs,
	SiPostgresql,
	SiRedux,
	SiSass,
	SiScrumalliance,
	SiShopify,
	SiTailwindcss,
} from "react-icons/si";
import { TbFileTypePhp } from "react-icons/tb";
import { BiLogoTypescript } from "react-icons/bi";
import { FaJs, FaNodeJs, FaWordpress } from "react-icons/fa";

export const Skeleton = () => {
	useEffect(() => {
		const sequence = [
			[".circle-1", { y: [-4, 0], scale: [1, 1.1, 1] }],
			[".circle-2", { y: [-4, 0], scale: [1, 1.1, 1] }],
			[".circle-3", { y: [-4, 0], scale: [1, 1.1, 1] }],
			[".circle-4", { y: [-4, 0], scale: [1, 1.1, 1] }],
			[".circle-5", { y: [-4, 0], scale: [1, 1.1, 1] }],
		];

		const animation = animate(sequence, {
			duration: 0.8,
			repeat: Infinity,
			repeatDelay: 1,
		});

		return () => animation.stop();
	}, []);

	return (
		<div className='p-8 overflow-hidden h-full relative flex-row items-center justify-center'>
			<h3 className='text-3xl text-white font-extrabold text-center mb-10'>
				My <span className='text-cyan-400'>Tech Stack</span>
			</h3>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				{/* Backend & APIs */}
				<div>
					<h2 className='text-lg font-semibold text-gray-800'>Backend & APIs</h2>
					<div className='flex flex-wrap gap-6'>
						<TbFileTypePhp className='h-14 w-14 text-[#8892be]' />
						<SiLaravel className='h-14 w-14 text-[#f55247]' />
						<BiLogoTypescript className='h-14 w-14 text-[#3178c6]' />
						<FaNodeJs className='h-14 w-14 text-[#6cc24a]' />
					</div>
				</div>

				{/* Frontend */}
				<div>
					<h2 className='text-lg font-semibold text-gray-800'>Frontend</h2>
					<div className='flex flex-wrap gap-6'>
						<IoLogoReact className='h-14 w-14 text-[#00d8ff]' />
						<SiRedux className='h-14 w-14 text-[#764abc]' />
						<SiNextdotjs className='h-14 w-14 text-gray-800' />
						<SiTailwindcss className='h-14 w-14 text-[#06b6d4]' />
					</div>
				</div>

				{/* Databases & Cloud */}
				<div>
					<h2 className='text-lg font-semibold text-gray-800'>Databases & Cloud</h2>
					<div className='flex flex-wrap gap-6'>
						<SiPostgresql className='h-14 w-14 text-[#336791]' />
						<SiAmazonwebservices className='h-14 w-14 text-[#ff9900]' />
					</div>
				</div>

				{/* E-commerce & CMS */}
				<div>
					<h2 className='text-lg font-semibold text-gray-800'>E-commerce & CMS</h2>
					<div className='flex flex-wrap gap-6'>
						<FaWordpress className='h-14 w-14 text-[#00aadc]' />
						<SiShopify className='h-14 w-14 text-[#96bf48]' />
					</div>
				</div>

				{/* Methodologies */}
				<div>
					<h2 className='text-lg font-semibold text-gray-800'>Methodologies</h2>
					<div className='flex flex-wrap gap-6'>
						<SiClickup className='h-14 w-14 text-[#7b68ee]' />
						<SiJira className='h-14 w-14 text-[#0052cc]' />
						<SiScrumalliance className='h-14 w-14 text-[#007acc]' />
					</div>
				</div>

				{/* Web Technologies */}
				<div>
					<h2 className='text-lg font-semibold text-gray-800'>Web Technologies</h2>
					<div className='flex flex-wrap gap-6'>
						<SiHtml5 className='h-14 w-14 text-[#e34f26]' />
						<SiCss3 className='h-14 w-14 text-[#1572b6]' />
						<FaJs className='h-14 w-14 text-[#f7df1e]' />
						<SiSass className='h-14 w-14 text-[#cc6699]' />
					</div>
				</div>
			</div>
		</div>
	);
};

const Sparkles = () => {
	const randomMove = () => Math.random() * 2 - 1;
	const randomOpacity = () => Math.random();
	const random = () => Math.random();

	return (
		<div className='absolute inset-0'>
			{[...Array(12)].map((_, i) => (
				<motion.span
					key={`star-${i}`}
					animate={{
						top: `calc(${random() * 100}% + ${randomMove()}px)`,
						left: `calc(${random() * 100}% + ${randomMove()}px)`,
						opacity: randomOpacity(),
						scale: [1, 1.2, 0],
					}}
					transition={{
						duration: random() * 2 + 4,
						repeat: Infinity,
						ease: "linear",
					}}
					style={{
						position: "absolute",
						top: `${random() * 100}%`,
						left: `${random() * 100}%`,
						width: "4px",
						height: "4px",
						borderRadius: "50%",
						zIndex: 1,
					}}
					className='inline-block bg-white'
				/>
			))}
		</div>
	);
};

export const CardSkeletonContainer = ({
	className,
	children,
	showGradient = true,
}: {
	className?: string;
	children: React.ReactNode;
	showGradient?: boolean;
}) => {
	return (
		<div className={cn("h-[250px] rounded-xl z-40", className, showGradient && "")}>{children}</div>
	);
};

const Container = ({ className, children }: { className?: string; children: React.ReactNode }) => {
	return (
		<div
			className={cn(
				`h-16 w-16 rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)]
        shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]`,
				className
			)}>
			{children}
		</div>
	);
};

export default Skeleton;
