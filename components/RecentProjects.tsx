"use client";

import { projects } from "@/data";
import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { HoverEffect } from "@/components/ui/CardHoverEffect";

const FEATURED_COUNT = 3;

const RecentProjects = () => {
	const featured = projects.slice(0, FEATURED_COUNT);
	const others = projects.slice(FEATURED_COUNT);

	return (
		<div id='projects'>
			<div className='mb-10 text-center'>
				<h3 className='text-2xl md:text-3xl font-bold text-white'>
					Recent<span className='text-cyan-400'> Projects</span>
				</h3>
			</div>
			<div className='max-w-5xl mx-auto'>
				<HoverEffect items={featured} />

				<div className='mt-16 px-2'>
					<p className='mb-4 text-xs uppercase tracking-widest text-slate-500'>More work</p>
					<ul className='divide-y divide-slate-800/70 border-y border-slate-800/70'>
						{others.map(project => (
							<li key={project.link}>
								<a
									href={project.link}
									target='_blank'
									rel='noopener noreferrer'
									className='group flex items-center gap-4 sm:gap-6 py-5 px-2 sm:px-4 rounded-xl transition-colors hover:bg-slate-900/60'>
									<span className='hidden sm:block w-12 shrink-0 text-sm tabular-nums text-slate-500'>
										{project.date.match(/\d{4}/)?.[0]}
									</span>
									<div className='min-w-0 flex-1'>
										<h4 className='font-semibold text-zinc-100 group-hover:text-cyan-400 transition-colors'>
											{project.title}
										</h4>
										<p className='mt-1 text-sm text-zinc-400 line-clamp-2 sm:line-clamp-1'>{project.des}</p>
									</div>
									<div className='hidden md:flex items-center'>
										{project.iconLists.map((icon, index) => (
											<div
												key={icon}
												className='border border-slate-400/[.2] rounded-full bg-slate-900 w-8 h-8 flex justify-center items-center'
												style={{ transform: `translateX(-${5 * index}px)` }}>
												<Image width={32} height={32} src={icon} alt='' className='p-1.5' />
											</div>
										))}
									</div>
									<ArrowUpRight className='h-5 w-5 shrink-0 text-slate-500 transition group-hover:text-cyan-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default RecentProjects;
