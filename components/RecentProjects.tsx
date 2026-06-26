"use client";

import { projects } from "@/data";
import React from "react";
import { HoverEffect } from "@/components/ui/CardHoverEffect";

const RecentProjects = () => {
	return (
		<div id='projects'>
			<div className='mb-10 text-center'>
				<h3 className='text-2xl md:text-3xl font-bold text-white'>
					Recent<span className='text-cyan-400'> Projects</span>
				</h3>
			</div>
			<div className='max-w-5xl mx-auto'>
				<HoverEffect items={projects} />
			</div>
		</div>
	);
};

export default RecentProjects;
