import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import ShimmerButton from "./ui/ShimmerButton";
import { FaRegEye } from "react-icons/fa";
import { Meteors } from "./ui/Meteors";

const words = `Turning Ideas into Seamless Digital User-Centric Experiences`;

const Hero = () => {
	return (
		<div className='pb-20 pt-36'>
			<div className='h-screen w-full bg-gradient-to-b from-black to-[#050a18] absolute top-0 left-0 flex items-center justify-center'>
				<Meteors number={5} />
			</div>

			<div className='flex justify-center relative my-20 z-10'>
				<div className='max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center'>
					<h2 className='uppercase tracking-widest text-s text-center text-blue-100 max-w-80'>
						Your Ideas, My Code
					</h2>
					<TextGenerateEffect
						className='text-center text-[40px] md:text-4xl lg:text-5xl'
						duration={2}
						filter={false}
						words={words}
					/>
					<a href='#projects'>
						<ShimmerButton title='View Portfolio' icon={<FaRegEye />} position='right' />
					</a>
				</div>
			</div>
		</div>
	);
};

export default Hero;
