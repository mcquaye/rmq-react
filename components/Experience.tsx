"use client";

import React, { useState } from "react";
import ShimmerButton from "./ui/ShimmerButton";
import { FaFileDownload } from "react-icons/fa";

const Experience = () => {
	const [email, setEmail] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:5000/send-resume", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			if (response.ok) {
				alert("Resume sent successfully!");
			} else {
				alert("Failed to send resume.");
			}
		} catch (error: any) {
			alert("An error occurred: " + error.message);
		}
	};

	return (
		<div className='relative flex flex-col items-center justify-center w-full h-96 overflow-hidden'>
			<div className='absolute inset-0 z-10 pointer-events-none bg-[mask-image:radial-gradient(transparent,white)]'></div>

			<div className='relative z-20 text-center p-10 flex flex-col items-center'>
				<h1 className='text-4xl font-bold'>
					My <span className='text-red-600'>Work Experience</span>
				</h1>
				<p className='text-lg text-gray-500 py-5'>
					Enter your email address to get my full work experience.
				</p>
				<form onSubmit={handleSubmit} className='w-full max-w-md'>
					<input
						type='email'
						placeholder='Enter your email address'
						className='w-full p-3 border border-gray-300 rounded'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<ShimmerButton title='Download Resume' icon={<FaFileDownload />} position='right' />
				</form>
			</div>
		</div>
	);
};

export default Experience;
