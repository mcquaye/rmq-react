import { FaLocationArrow } from "react-icons/fa6";
import ShimmerButton from "@/components/ui/ShimmerButton";
import Image from "next/image";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
	return (
		<footer className='pt-20 pb-10' id='contact'>
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
			<div className='flex flex-col md:flex-row justify-between items-center mt-36 px-4 w-full'>
				<div className='flex items-center'>
					<p className='text-sm md:text-base font-normal'>
						Copyright &copy; {new Date().getFullYear()} RMQ
					</p>
				</div>

				<div className='flex items-center mt-10 md:mt-0 space-x-6'>
					<a
						href='https://www.github.com/mcquaye/'
						target='_blank'
						rel='noopener noreferrer'
						className='w-10 h-10 flex items-center justify-center bg-red-600 rounded-lg border border-black-300 backdrop-filter backdrop-blur-lg saturate-180 hover:bg-black'>
						<Image src='/git.svg' alt='social media icon' width={20} height={20} />
					</a>
					<a
						href='https://www.linkedin.com/in/mcquaye/'
						target='_blank'
						rel='noopener noreferrer'
						className='w-10 h-10 flex items-center justify-center bg-red-600 rounded-lg border border-black-300 backdrop-filter backdrop-blur-lg saturate-180 hover:bg-black'>
						<Image src='/link.svg' alt='social media icon' width={20} height={20} />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
