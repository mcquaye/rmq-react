"use client";

import { projects } from "@/data";
import React from "react";
import { PinContainer } from "./ui/3d-pin";
import { FaLocationArrow } from "react-icons/fa";
import Image from "next/image";
import { HoverEffect } from "@/components/ui/CardHoverEffect";

const RecentProjects = () => {
	return (
		<div className='py-20' id='projects'>
			<div className='mb-10 text-center'>
				<h3 className='text-3xl font-extrabold'>
					A Small Selection of {""}
					<span className='text-[#25e2ff]'>Recent Projects</span>
				</h3>
			</div>
			<div className='max-w-5xl mx-auto'>
				<HoverEffect items={projects} />
			</div>
		</div>
	);
};

export default RecentProjects;
