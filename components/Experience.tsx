"use client";

import React, { useState } from "react";
import ShimmerButton from "./ui/ShimmerButton";
import { FaFileDownload } from "react-icons/fa";
import { LinkPreview } from "./ui/LinkPreview";
import Image from "next/image";
import { workExperience } from "@/data";

const Experience = () => {
	return (
		<div className='relative flex flex-col items-center justify-center max-w-7xl w-full h-full overflow-hidden'>
			<div className='relative z-20 p-10 flex flex-col items-center'>
				<h1 className='text-4xl font-bold text-center '>
					My <span className='text-cyan-400'>Work Experience</span>
				</h1>

				<div className='grid grid-cols-2 gap-16 my-10'>
					{workExperience.map((experience, idx) => (
						<div
							key={idx}
							className='group bg-gray-100 shadow-sm group-hover:shadow-lg transition-all duration-200 hover:bg-[#050a18] p-6 rounded-lg overflow-hidden'>
							<p className='text-left relative z-20 mt-2'>
								<LinkPreview url={experience.url}>
									<p className='group-hover:text-white text-cyan-700 text-2xl font-bold'>
										{" "}
										{experience.title}
									</p>
									<p className='text-sm group-hover:text-gray-300'>{experience.location}</p>
									<p className='group-hover:text-cyan-400'>{experience.position}</p>
								</LinkPreview>
							</p>
							<hr className='mt-4 border-gray-500 group-hover:border-cyan-400' />
							<p className='mt-4 relative z-20 text-m group-hover:text-white'>{experience.desc}</p>
							<div className='flex items-center'>
								{experience.iconLists?.map((icon, index) => (
									<div
										key={index}
										className='border mt-5 border-slate-400/[.2] rounded-full bg-white group-hover:bg-gray-700 lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center'
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

				<a
					href='https://drive.google.com/file/d/1mugTLma-fzp-eIEveH5qkhtwP-orozVs/view'
					target='_blank'>
					<ShimmerButton title='Download Full Resume' icon={<FaFileDownload />} position='right' />
				</a>
			</div>
		</div>
	);
};

export default Experience;
