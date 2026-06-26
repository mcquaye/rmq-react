import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { BackgroundLines } from "./ui/background-lines";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const NewYearCountdown = () => {
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	const [isNewYear, setIsNewYear] = useState(false);
	const [showCelebration, setShowCelebration] = useState(true);

	useEffect(() => {
		// Check if user has already dismissed the celebration
		const hasViewed = localStorage.getItem("newYear2025Viewed");
		const lastViewDate = new Date(hasViewed || "");
		const currentDate = new Date();
		const endDate = new Date("January 5, 2025 23:59:59");

		if (hasViewed && lastViewDate > endDate) {
			setShowCelebration(false);
		}
	}, []);

	useEffect(() => {
		const targetDate = new Date("January 1, 2025 00:00:00").getTime();

		const calculateTimeLeft = () => {
			const now = new Date().getTime();
			const difference = targetDate - now;

			if (difference <= 0) {
				setIsNewYear(true);
				return;
			}

			setTimeLeft({
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
				minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
				seconds: Math.floor((difference % (1000 * 60)) / 1000),
			});
		};

		calculateTimeLeft();
		const timer = setInterval(calculateTimeLeft, 1000);
		return () => clearInterval(timer);
	}, []);

	const handleClose = () => {
		setShowCelebration(false);
		localStorage.setItem("newYear2025Viewed", new Date().toISOString());
	};

	if (!showCelebration) return null;

	const confettiVariants = {
		initial: { y: -1000, opacity: 0 },
		animate: { y: 0, opacity: 1 },
		exit: { y: 1000, opacity: 0 },
	};

	const textVariants = {
		initial: { scale: 0, opacity: 0 },
		animate: { scale: 1, opacity: 1 },
		exit: { scale: 0, opacity: 0 },
	};

	// New Years
	const words = `May this year bring endless opportunities and beautiful moments!`;

	if (isNewYear) {
		return (
			<AnimatePresence>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 flex flex-col items-center justify-center text-white z-50'>
					<BackgroundLines className='flex h-screen items-center justify-center w-full flex-col px-4 bg-gradient-to-b from-black to-[#050a18]'>
						<button
							onClick={handleClose}
							className='absolute top-4 right-4 p-6 rounded-full hover:bg-white/20'>
							<X size={34} />
						</button>

						<motion.img
							initial='initial'
							animate='animate'
							exit='exit'
							src='/2025.png'
							alt='RMQ - 2025 New Years'
							className='h-auto mx-auto sm:h-40 md:h-60'
						/>

						<motion.h1
							initial='initial'
							animate='animate'
							exit='exit'
							variants={textVariants}
							transition={{ duration: 0.8, type: "spring" }}
							className='bg-clip-text text-transparent text-center bg-gradient-to-b from-[#25e2ff] to-[#d3f9ff] text-2xl md:text-4xl lg:text-7xl font-sans py-2 relative z-20 font-bold tracking-tight'>
							HAPPY NEW YEAR
						</motion.h1>

						<motion.div
							initial={{ y: 100, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 1 }}
							className='max-w-xl mx-4'>
							<TextGenerateEffect
								className='text-center text-[16px] md:text-xl lg:text-2xl'
								duration={3}
								filter={false}
								words={words}
							/>
						</motion.div>
					</BackgroundLines>
				</motion.div>
			</AnimatePresence>
		);
	}

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				className='fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black to-[#050a18] text-white z-50'>
				<button
					onClick={handleClose}
					className='absolute top-4 right-4 p-6 rounded-full hover:bg-white/20'>
					<X size={34} />
				</button>

				<motion.h1
					animate={{
						textShadow: [
							"0 0 20px rgba(37,256,255,0.5)",
							"0 0 40px rgba(37,256,255,0.8)",
							"0 0 20px rgba(37,256,255,0.5)",
						],
					}}
					transition={{ duration: 2, repeat: Infinity }}
					className='text-5xl md:text-6xl font-bold mb-12 text-center'>
					Countdown to 2025
				</motion.h1>

				<div className='grid grid-cols-2 md:grid-cols-4 gap-6 text-center'>
					{[
						{ label: "Days", value: timeLeft.days },
						{ label: "Hours", value: timeLeft.hours },
						{ label: "Minutes", value: timeLeft.minutes },
						{ label: "Seconds", value: timeLeft.seconds },
					].map((item, index) => (
						<motion.div
							key={item.label}
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: index * 0.2 }}
							whileHover={{ scale: 1.1 }}
							className='bg-[#25e2ff] backdrop-blur-sm rounded-lg p-6 min-w-[140px] shadow-lg'>
							<motion.div
								key={item.value}
								animate={{ scale: [1, 1.2, 1] }}
								transition={{ duration: 0.3 }}
								className='text-5xl font-bold text-black'>
								{item.value}
							</motion.div>
							<div className='text-sm uppercase mt-2 text-black'>{item.label}</div>
						</motion.div>
					))}
				</div>

				<motion.div
					onClick={handleClose}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1 }}
					className='mt-12 text-sm text-center'>
					click to close timer
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default NewYearCountdown;
