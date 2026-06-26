"use client";

import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { MdEditCalendar } from "react-icons/md";
import Image from "next/image";
import { SiPeerlist } from "react-icons/si";
import WhiteButton from "./ui/WhiteButton";

function Footer() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Function to open the modal
	const openModal = (e: React.MouseEvent) => {
		e.preventDefault(); // Prevent the default anchor behavior (scrolling)
		setIsModalOpen(true); // Open the modal
	};

	// Function to close the modal
	const closeModal = () => setIsModalOpen(false);

	return (
		<footer className='pt-20 pb-10' id='contact'>
			<div className='flex flex-col items-center z-20 p-5'>
				<h3 className='text-2xl md:text-4xl font-bold text-center text-white mb-10'>
					Let&apos;s Create <span className='text-cyan-400'>Amazing</span> Things Together.
				</h3>
				<div className='flex gap-4'>
					<a href='mailto:mcquaye@outlook.com'>
						<WhiteButton title='Email Me Directly' icon={<FaLocationArrow />} position='right' />
					</a>
					<a href='#Calendar' onClick={openModal}>
						<WhiteButton title='Schedule A Quick Call' icon={<MdEditCalendar />} position='right' />
					</a>
				</div>
			</div>
			<div className='flex flex-col md:flex-row justify-between items-center mt-36 px-4 w-full'>
				<div className='flex items-center'>
					<p className='text-sm md:text-base font-normal text-slate-400'>
						Copyright &copy; {new Date().getFullYear()} RMQ
					</p>
				</div>

				<div className='flex items-center mt-10 md:mt-0 space-x-6'>
					<a
						href='https://www.github.com/mcquaye/'
						target='_blank'
						rel='noopener noreferrer'
						className='w-10 h-10 flex items-center justify-center bg-cyan-400 rounded-lg border border-black-300 backdrop-filter backdrop-blur-lg saturate-180 hover:bg-gray-500'>
						<Image src='/git.svg' alt='social media icon' width={20} height={20} />
					</a>
					<a
						href='https://www.linkedin.com/in/mcquaye/'
						target='_blank'
						rel='noopener noreferrer'
						className='w-10 h-10 flex items-center justify-center bg-cyan-400 rounded-lg border border-black-300 backdrop-filter backdrop-blur-lg saturate-180 hover:bg-blue-500'>
						<Image src='/link.svg' alt='social media icon' width={20} height={20} />
					</a>
					<a
						href='https://peerlist.io/rmqgh'
						target='_blank'
						rel='noopener noreferrer'
						className='w-10 h-10 flex items-center justify-center bg-cyan-400 rounded-lg border border-black-300 backdrop-filter text-white backdrop-blur-lg saturate-180 hover:bg-green-800'>
						<SiPeerlist size={20} />
					</a>
				</div>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50'>
					<div className='bg-white rounded-lg w-3/4 md:w-1/2 p-6'>
						<h2 className='text-2xl font-bold mb-4'>Schedule a Call</h2>
						<div className='max-w-7xl w-full'>
							<iframe
								src='https://calendar.google.com/calendar/appointments/schedules/AcZssZ0SDM3FNofPfASa2GvEzzB-M8wlpm3B13EzUJZxsH9B8lYudZbWnUlnZS2YoHH4MNHjZaKE_qoS?gv=true'
								style={{ border: 0 }}
								width='100%'
								height='600'
								frameBorder='0'></iframe>
						</div>
						<div className='mt-4 text-right'>
							<button className='px-4 py-2 bg-blue-600 text-white rounded-md' onClick={closeModal}>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</footer>
	);
}

export default Footer;
