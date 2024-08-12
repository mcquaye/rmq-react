import { projects } from "@/data";
import React from "react";
import { PinContainer } from "./ui/3d-pin";
import { FaLocationArrow } from "react-icons/fa";

const RecentProjects = () => {
	return (
		<div className='py-20' id='projects'>
			<div className='mb-20'>
				<h1 className='heading'>
					A Small Selection of {""}
					<span className='text-red-700'>Recent Projects</span>
				</h1>
			</div>
			<div className='flex flex-wrap items-center justify-center gap-x-24 gap-y-8 mt-10'>
				{projects.map(({ id, title, des, img, iconLists, link, date }) => (
					<div
						key={id}
						className='sm:h-[41rem] lg:min-h-[32.5rem] h-[32rem] flex items-center justify-center sm:w-[570px] w-[80vw]'>
						<PinContainer title={link} href={link}>
							<div className='relative flex items-center justify-center sm:w-[570px] sm:h-[40vh] w-[80vw] overflow-hidden h-[30vh] mb-10'>
								<img
									src={img}
									alt={title}
									className='z-10 absolute bottom-0 bg-cover bg-center bg-no-repeat'
								/>
							</div>
							<h2 className='text-white mt-4  mb-2 font-bold lg:text-xl md:text-l text-base line-clamp-1'>
								{title}
							</h2>
							<p className='text-gray-400 lg:text-xl lg:font-normal font-light text-sm line-clamp-3'>
								{des}
							</p>
							<p className='text-sm text-cyan-500 mt-3'>
								<span className='text-gray-400'>Completed:</span> {date}
							</p>
							<div className='flex items-center justify-between mt-7 mb-3'>
								<div className='flex items-center'>
									{iconLists.map((icon, index) => (
										<div
											key={index}
											className='border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center'
											style={{
												transform: `translateX(-${5 * index + 2}px)`,
											}}>
											<img src={icon} alt='icon5' className='p-2' />
										</div>
									))}
								</div>
								<div className='flex justify-center items-center'>
									<p className='flex text-gray-400 text-xs'>View Live Site</p>
									<FaLocationArrow className='ms-3' color='#06b6d4' />
								</div>
							</div>
						</PinContainer>
					</div>
				))}
			</div>
		</div>
	);
};

export default RecentProjects;
