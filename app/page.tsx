"use client";

import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import GitHubContributions from "@/components/GitHubContributions";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav, navItems } from "@/components/ui/FloatingNav";

export default function Home() {
	return (
		<main className='relative flex flex-col items-center overflow-hidden bg-[#050a18]'>
			<FloatingNav navItems={navItems} />

			<Hero />

			{/* Projects */}
			<section className='relative w-full max-w-6xl px-5 sm:px-10 py-24'>
				<RecentProjects />
			</section>

			{/* Testimonials */}
			<section id='testimonials' className='relative w-full py-24 border-t border-slate-800/50'>
				<div className='max-w-6xl mx-auto px-5 sm:px-10'>
					<h3 className='text-2xl md:text-3xl font-bold text-center text-white mb-12'>
						What <span className='text-cyan-400'>Clients</span> Say
					</h3>
					<Clients />
				</div>
			</section>

			{/* GitHub */}
			<section className='relative w-full py-24 border-t border-slate-800/50'>
				<div className='max-w-6xl mx-auto px-5 sm:px-10'>
					<GitHubContributions />
				</div>
			</section>

			{/* Experience */}
			<section className='relative w-full py-24 border-t border-slate-800/50'>
				<div className='max-w-6xl mx-auto px-5 sm:px-10'>
					<Experience />
				</div>
			</section>

			<Footer />
		</main>
	);
}
