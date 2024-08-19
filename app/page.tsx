import Approach from "@/components/Approach";
import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav, navItems } from "@/components/ui/FloatingNav";

export default function Home() {
	return (
		<main className='relative flex justify-center items-center flex-col overflow-hidden mx-auto bg-white inset-0 bg-[radial-gradient(#f0f3f4_1px,transparent_1px)] bg-[size:3px_3px]'>
			<div className='max-w-7xl'>
				<FloatingNav navItems={navItems} />
				<Hero />
			</div>
			<div className='max-w-7xl sm:px-10 px-5 w-full'>
				<Grid />
			</div>
			<RecentProjects />
			<div className='max-w-7xl mt-10 w-full' id='testimonials'>
				<h3 className='text-3xl text-center font-extrabold'>
					A Few Words From <span className='text-cyan-400'>Satisfied Clients</span>
				</h3>
			</div>
			<Clients />
			<Experience />
			<div className='max-w-7xl w-full'>
				<Approach />
			</div>
			<Footer />
			<div className='max-w-7xl w-full '></div>
		</main>
	);
}
