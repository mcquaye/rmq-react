import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import ShimmerButton from "@/components/ui/ShimmerButton";
import Image from "next/image";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
	return (
		<footer className='w-full pt-20 pb-10' id='contact'>
			{/* background grid */}
			<div className='w-full absolute left-0 -bottom-72 min-h-96'>
				<Image
					width={100}
					height={100}
					src='/footer-grid.svg'
					alt='grid'
					className='w-full h-full opacity-80 '
				/>
			</div>

			<div className='flex flex-col items-center z-20'>
				<h1 className='heading lg:max-w-[35vw] m-7'>
					Let&apos;s Create <span className='text-red-600'>Amazing</span> Things Together.
				</h1>
				<p className='text-gray-500 md:mt-10 m-5 text-center'>
					Tell me about your awesome idea / project, or just say hi!
				</p>
				<a href='mailto:mcquaye@outlook.com'>
					<ShimmerButton title="Let's get in touch" icon={<FaLocationArrow />} position='right' />
				</a>
			</div>
			<div className='flex flex-col md:flex-row justify-between items-center mt-36 px-4'>
				<div className='flex items-center'>
					<p className='text-sm md:text-base font-light'>
						Copyright &copy; {new Date().getFullYear()} RMQ
					</p>
				</div>

				<div className='flex items-center space-x-6'>
					{socialMedia.map((info) => (
						<a
							key={info.id}
							href={info.link}
							target='_blank'
							rel='noopener noreferrer'
							className='w-10 h-10 flex items-center justify-center bg-red-600 rounded-lg border border-black-300 backdrop-filter backdrop-blur-lg saturate-180 hover:bg-black'>
							<Image src={info.img} alt='social media icon' width={20} height={20} />
						</a>
					))}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
