"use client";

import { animate, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { IoLogoAngular, IoLogoReact } from "react-icons/io5";
import { SiLaravel, SiPhp } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";

export const Skeleton = () => {
	const scale = [1, 1.1, 1];
	const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
	const sequence = [
		[
			".circle-1",
			{
				scale,
				transform,
			},
			{ duration: 0.8 },
		],
		[
			".circle-2",
			{
				scale,
				transform,
			},
			{ duration: 0.8 },
		],
		[
			".circle-3",
			{
				scale,
				transform,
			},
			{ duration: 0.8 },
		],
		[
			".circle-4",
			{
				scale,
				transform,
			},
			{ duration: 0.8 },
		],
		[
			".circle-5",
			{
				scale,
				transform,
			},
			{ duration: 0.8 },
		],
	];

	useEffect(() => {
		// @ts-ignore
		animate(sequence, {
			repeat: Infinity,
			repeatDelay: 1,
		});
	});
	return (
		<div className='p-8 overflow-hidden h-full relative flex items-center justify-center'>
			<div className='flex flex-row flex-shrink-0 justify-center items-center gap-2'>
				<Container className='h-11 w-11 circle-1'>
					<BiLogoTypescript className='h-6 w-6' color='#3178c6' />
				</Container>
				<Container className='h-14 w-14 circle-2'>
					<SiPhp className='h-8 w-8' color='#8892be' />
				</Container>
				<Container className='circle-3'>
					<IoLogoReact className='h-10 w-10' color='#00d8ff' />
				</Container>
				<Container className='h-14 w-14 circle-4'>
					<SiLaravel className='h-8 w-8' color='#f55247' />
				</Container>
				<Container className='h-10 w-10 circle-5'>
					<IoLogoAngular className='h-6 w-6' color='#e74c3c' />
				</Container>
			</div>

			<div className='h-40 w-px absolute top-3 m-auto z-40 bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move'>
				<div className='w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10'>
					<Sparkles />
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
						width: `4px`,
						height: `4px`,
						borderRadius: "50%",
						zIndex: 1,
					}}
					className='inline-block bg-white'></motion.span>
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
		<div
			className={cn(
				"h-[150px] rounded-xl z-40",
				className,
				showGradient &&
					"bg-[#050a18] [mask-image:radial-gradient(50%_50%_at_50%_50%,#0f1831_0%,transparent_100%)]"
			)}>
			{children}
		</div>
	);
};

const Container = ({ className, children }: { className?: string; children: React.ReactNode }) => {
	return (
		<div
			className={cn(
				`h-16 w-16 rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)]
    shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]
    `,
				className
			)}>
			{children}
		</div>
	);
};
