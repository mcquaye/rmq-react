import { FaLocationArrow } from "react-icons/fa6";
import ShimmerButton from "@/components/ui/ShimmerButton";
import Image from "next/image";
import { SiPeerlist } from "react-icons/si";

const date = new Date();

function Footer() {
	return (
		<footer className='pt-20 pb-10' id='contact'>
			<div className='flex flex-col items-center z-20 p-5'>
				<h1 className='heading lg:max-w-[35vw] mb-5'>
					Let&apos;s Create <span className='text-cyan-400'>Amazing</span> Things Together.
				</h1>
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
		</footer>
	);
}

export default Footer;
