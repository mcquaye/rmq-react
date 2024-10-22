"use client";

import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./GradientBackground";
import { GlobeObject } from "./GridGlobe";
import Lottie from "react-lottie";
import { useState } from "react";
import animationData from "@/data/confetti.json";
import ShimmerButton from "./ShimmerButton";
import { IoCopyOutline } from "react-icons/io5";
import { CardSkeletonContainer, Skeleton } from "./AnimatedIcons";
import Image from "next/image";

export const BentoGrid = ({
	className,
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				"grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
				className
			)}>
			{children}
		</div>
	);
};

export const BentoGridItem = ({
	className,
	title,
	description,
	imgClassName,
	titleClassName,
	spareImg,
	id,
	img,
}: {
	id?: number;
	img?: string;
	className?: string;
	title?: string | React.ReactNode;
	description?: string | React.ReactNode;
	imgClassName?: string;
	titleClassName?: string;
	spareImg?: string;
}) => {
	const [copied, setCopied] = useState(false);

	const defaultOptions = {
		loop: false,
		autoplay: false,
		animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	const handleCopy = () => {
		const email = "mcquaye@outlook.com";
		navigator.clipboard
			.writeText(email)
			.then(() => {
				setCopied(true);
				console.log("Email Copied: ", email);
			})
			.catch((err) => console.error("Failed to copy email: ", err));
	};

	return (
		<div
			className={cn(
				"row-span-1 relative overflow-hidden rounded-xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input justify-between flex flex-col space-y-4",
				className
			)}
			style={{
				background: "#050a18",
				backgroundImage: "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 97%)",
			}}>
			<div className={cn({ "flex justify-center": id === 6 }, "h-full")}>
				<div className='w-full h-full absolute'>
					{img && (
						<Image
							width={100}
							height={100}
							src={img}
							alt={img}
							className={cn(imgClassName, "object-cover object-center")}
						/>
					)}
				</div>

				<div className={cn("absolute right-0 -bottom-5", { "w-full opacity-80": id === 5 })}>
					{spareImg && (
						<Image
							width={100}
							height={100}
							src={spareImg}
							alt={spareImg}
							className='h-full w-full object-cover object-center'
						/>
					)}
				</div>

				{id === 6 && <BackgroundGradientAnimation />}

				<div
					className={cn(
						titleClassName,
						"group-hover/bento:translate-x-2 transition duration-200 relative min-h-40 flex flex-col px-5 p-5 lg:p-10"
					)}>
					<div className='font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#fff] z-10'>
						{description}
					</div>
					<div className='font-sans text-white text-lg lg:text-3xl max-w-full font-bold z-10'>
						{title}
					</div>

					{id === 2 && <GlobeObject />}

					{id === 3 && (
						<CardSkeletonContainer>
							<Skeleton />
						</CardSkeletonContainer>
					)}

					{id === 6 && (
						<div className='relative mt-5'>
							<div className={`absolute -bottom-5 right-0 ${copied ? "block" : "hidden"}`}>
								<Lottie options={defaultOptions} height={200} width={500} />
							</div>

							<ShimmerButton
								title={copied ? "Email is Copied!" : "Copy My Email"}
								icon={<IoCopyOutline />}
								position='right'
								handleClick={handleCopy}
								otherClasses='!bg-[#0b0b0b]'
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
