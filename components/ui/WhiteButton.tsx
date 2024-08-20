import React from "react";

const WhiteButton = ({
	title,
	icon,
	position,
	handleClick,
	otherClasses,
}: {
	title: string;
	icon: React.ReactNode;
	position: string;
	handleClick?: () => void;
	otherClasses?: string;
}) => {
	return (
		<div className='relative group'>
			<div className='absolute -inset-5'>
				<div className='w-full h-full max-w-sm mx-auto lg:mx-0 opacity-30 blur-lg bg-gradient-to-r from-cyan-400 via-red-500 to-purple'></div>
			</div>
			<button
				onClick={handleClick}
				className='relative z-10 inline-flex items-center justify-center w-full px-8 py-3 text-white transition-all duration-200 bg-gray-900 gap-x-3 border-2 border-transparent sm:w-auto rounded-xl hover:bg-black group-hover:text-cyan-400'>
				{position === "left" && icon}
				{title}
				{position === "right" && icon}
			</button>
		</div>
	);
};

export default WhiteButton;
