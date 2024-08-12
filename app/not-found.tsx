import Link from "next/link";
import Image from "next/image";
import React from "react";

const NotFound: React.FC = () => {
	return (
		<div className='flex flex-col items-center justify-center h-screen bg-black text-gray-400'>
			<h2 className='text-4xl font-bold mb-4'>404 - Page Not Found</h2>
			<p className='mb-8'>{"Sorry We Couldn't Locate The Page You Are Looking For."}</p>
			<div className='flex justify-center text-yellow-400 sm:justify-start'>
				<Image
					src='/logo.svg'
					height={100}
					width={100}
					alt='Logo - RMQ'
					className='h-32 w-full mb-5'
				/>
			</div>
			<Link href='/' className=''>
				<button className='rounded button-small bg-red-600 p-3 text-white'>Go To Home</button>
			</Link>
		</div>
	);
};

export default NotFound;
