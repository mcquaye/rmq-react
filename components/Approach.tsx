"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { CanvasRevealEffect } from "./ui/CanvasRevealEffect";
import { cardData } from "@/data";

const Approach = () => {
	return (
		<section className='w-full py-20' id='experience'>
			<div className='text-center'>
				<h3 className='text-3xl font-extrabold'>
					My Process Dev. <span className='text-cyan-400'>Is Practical</span>
				</h3>
			</div>
			<div className='my-10 flex flex-col lg:flex-row items-center justify-center w-full gap-4 p-10 sm:p-0'>
				{cardData.map(({ id, title, order, description }) => (
					<Card key={id} title={title} icon={<BigText order={order} />} description={description}>
						<CanvasRevealEffect
							animationSpeed={3}
							containerClassName='bg-[#050a18]'
							colors={[[125, 211, 252, 0.4]]}
						/>
					</Card>
				))}
			</div>
		</section>
	);
};

export default Approach;

const Card = ({
	title,
	icon,
	children,
	description,
}: {
	title: string;
	icon: React.ReactNode;
	children?: React.ReactNode;
	description: string;
}) => {
	const [hovered, setHovered] = React.useState(false);
	return (
		<div
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className='border border-red-600/[0.1] group/canvas-card flex items-center justify-center
        max-w-sm w-full mx-auto p-4 relative lg:h-[35rem]'
			style={{
				background: "#fff",
				backgroundColor: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
			}}>
			<Icon className='absolute -top-3 -left-3 h-6 w-6 text-black' />
			<Icon className='absolute -bottom-3 -left-3 h-6 w-6 text-black' />
			<Icon className='absolute -top-3 -right-3 h-6 w-6 text-black' />
			<Icon className='absolute -bottom-3 -right-3 h-6 w-6 text-black' />

			<AnimatePresence>
				{hovered && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='h-full w-full absolute inset-0'>
						{children}
					</motion.div>
				)}
			</AnimatePresence>

			<div className='relative z-20 px-10'>
				<div
					className='text-center group-hover/canvas-card:-translate-y-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
        group-hover/canvas-card:opacity-0 transition duration-200 min-w-40 mx-auto flex items-center justify-center'>
					{icon}
				</div>
				<h2 className='text-center text-3xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200'>
					{title}
				</h2>
				<p
					className='text-sm opacity-0 group-hover/canvas-card:opacity-100 relative z-10 mt-4 group-hover/canvas-card:text-white text-center group-hover/canvas-card:-translate-y-2 transition duration-200'
					style={{ color: "#E4ECFF" }}>
					{description}
				</p>
			</div>
		</div>
	);
};
const BigText = ({ order }: { order: string }) => {
	return (
		<div>
			<button className='relative text-lg px-10 py-4 border border-black bg-transparent text-white transition duration-200 group shadow-sm'>
				<div className='absolute -bottom-2 -right-2 h-full w-full bg-cyan-400 -z-10 transition-all duration-200 group-hover:bottom-0 group-hover:right-0' />
				<span className='relative font-bold'>{order}</span>
			</button>
		</div>
	);
};

export const Icon = ({ className, ...rest }: any) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth='1.5'
			stroke='currentColor'
			className={className}
			{...rest}>
			<path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
		</svg>
	);
};
