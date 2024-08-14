import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

interface Item {
	iconLists?: string[];
	date?: string;
	title: string;
	des?: string;
	link: string;
}

interface HoverEffectProps {
	items: Item[];
	className?: string;
}

export const HoverEffect = ({ items, className }: HoverEffectProps) => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3", className)}>
			{items.map((item, idx) => (
				<Link
					href={item.link}
					key={item.link}
					target='_blank'
					className='relative group block p-2 h-full w-full'
					onMouseEnter={() => setHoveredIndex(idx)}
					onMouseLeave={() => setHoveredIndex(null)}>
					<AnimatePresence>
						{hoveredIndex === idx && (
							<motion.span
								className='absolute inset-0 h-full w-full bg-cyan-200 block rounded-3xl'
								layoutId='hoverBackground'
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
									transition: { duration: 0.15 },
								}}
								exit={{
									opacity: 0,
									transition: { duration: 0.15, delay: 0.2 },
								}}
							/>
						)}
					</AnimatePresence>
					<Card>
						<CardTitle>{item.title}</CardTitle>
						<CardDescription>{item.des}</CardDescription>
						<CardDate>{item.date}</CardDate>
						<CardIcons>
							<div className='flex items-center'>
								{item.iconLists?.map((icon, index) => (
									<div
										key={index}
										className='border border-slate-400/[.2] rounded-full bg-slate-900 lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center'
										style={{
											transform: `translateX(-${5 * index + 2}px)`,
										}}>
										<Image width={40} height={40} src={icon} alt={`icon${index}`} className='p-2' />
									</div>
								))}
							</div>
						</CardIcons>
					</Card>
				</Link>
			))}
		</div>
	);
};

export const Card = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				"rounded-2xl h-full w-full p-4 overflow-hidden bg-gradient-to-b from-black to-[#050a18] border border-transparent  group-hover:border-slate-700 relative z-20",
				className
			)}>
			<div className='relative z-50'>
				<div className='p-4'>{children}</div>
			</div>
		</div>
	);
};

export const CardTitle = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>{children}</h4>
	);
};

export const CardDescription = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<p className={cn("mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>
			{children}
		</p>
	);
};

export const CardDate = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<p className={cn("mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>
			{children}
		</p>
	);
};

export const CardIcons = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<div className={cn("flex items-center justify-between mt-7 mb-3", className)}>{children}</div>
	);
};
