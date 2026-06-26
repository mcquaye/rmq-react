import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import ShimmerButton from "./ui/ShimmerButton";
import { FaRegEye } from "react-icons/fa";
import { Meteors } from "./ui/Meteors";

const words = `API Architect | SAAS Developer | Full-Stack Engineer`;

const Hero = () => {
	return (
		<div className='relative w-full min-h-screen flex items-center justify-center overflow-hidden'>
			{/* Background */}
			<div className="absolute inset-0 bg-[url('/bg-2.jpg')] bg-cover bg-center" />
			<div className='absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-[#050a18]/95' />

			{/* Meteors effect */}
			<Meteors number={8} />

			{/* Content */}
			<div className='relative z-10 flex flex-col items-center justify-center px-5 text-center max-w-3xl mx-auto'>
				<p className='uppercase tracking-[0.3em] text-sm text-cyan-400/80 mb-6'>R. M. Q.</p>

				<TextGenerateEffect
					className='text-[36px] md:text-5xl lg:text-6xl font-bold text-white leading-tight'
					duration={2}
					filter={false}
					words={words}
				/>

				<p className='mt-6 text-slate-400 text-sm md:text-base max-w-xl leading-relaxed'>
					Full-stack engineer with 12+ years building scalable APIs, SaaS platforms, and enterprise
					solutions across e-commerce, healthcare, and fintech.
				</p>

				<div className='mt-10 flex flex-wrap gap-4 justify-center'>
					<a href='#projects'>
						<ShimmerButton title='View Work' icon={<FaRegEye />} position='right' />
					</a>
				</div>

				{/* Tech stack — single line, text only */}
				<p className='mt-16 text-xs text-slate-600 tracking-wider'>
					PHP &middot; Laravel &middot; TypeScript &middot; React &middot; Next.js &middot;
					PostgreSQL &middot; AWS
				</p>
			</div>
		</div>
	);
};

export default Hero;
