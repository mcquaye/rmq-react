"use client";

import React from "react";
import { FaFileDownload } from "react-icons/fa";
import { LinkPreview } from "./ui/LinkPreview";
import Image from "next/image";
import { workExperience } from "@/data";
import WhiteButton from "./ui/WhiteButton";

const Experience = () => {
	return (
		<div className='w-full'>
			<h3 className='text-2xl md:text-3xl font-bold text-center text-white mb-10'>
				My <span className='text-cyan-400'>Work Experience</span>
			</h3>

			<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
				{workExperience.map((experience, idx) => (
					<div
						key={idx}
						className='group bg-gradient-to-b from-slate-900 to-[#050a18] border border-slate-800 hover:border-cyan-400/30 transition-all duration-300 p-6 rounded-xl'>
						<LinkPreview url={experience.url}>
							<p className='text-white text-xl font-bold group-hover:text-cyan-400 transition-colors'>
								{experience.title}
							</p>
							<p className='text-sm text-slate-400'>{experience.location}</p>
							<p className='text-slate-500 text-sm group-hover:text-cyan-400 transition-colors'>
								{experience.position}
							</p>
						</LinkPreview>
						<hr className='mt-4 border-slate-700 group-hover:border-cyan-400/50 transition-colors' />
						<p className='mt-4 text-sm text-slate-300 leading-relaxed'>{experience.desc}</p>
						<div className='flex items-center'>
							{experience.iconLists?.map((icon, index) => (
								<div
									key={index}
									className='border mt-5 border-slate-700 rounded-full bg-slate-800 lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center'
									style={{
										transform: `translateX(-${5 * index + 2}px)`,
									}}>
									<Image width={40} height={40} src={icon} alt={`icon${index}`} className='p-2' />
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			<div className='mt-10 text-center'>
				<a
					href='https://drive.google.com/file/d/1-3urbGu6jkVavk27hIRdsnqvIt9K8JmR/view'
					target='_blank'>
					<WhiteButton title='Download Full Resume' icon={<FaFileDownload />} position='right' />
				</a>
			</div>
		</div>
	);
};

export default Experience;
