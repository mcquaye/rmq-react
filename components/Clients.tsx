import React from "react";
import { InfiniteMovingCards } from "./ui/InfiniteMovingCards";
import { companies, testimonials } from "@/data";
import Image from "next/image";

const Clients = () => {
	return (
		<div className=''>
			<div className='flex flex-col lg:mt-10'>
				<InfiniteMovingCards items={testimonials} direction='right' speed='slow' />
			</div>

			<div className='flex flex-wrap items-center py-10 justify-center gap-6 md:gap-10'>
				{companies.map((company) => (
					<div
						key={company.id}
						className='flex justify-center items-center w-24 sm:w-28 md:w-32 h-16 bg-slate-900/50 rounded-lg border border-slate-800 p-3'>
						<Image
							width={100}
							height={100}
							src={company.img}
							alt={company.name}
							className='w-full h-auto object-contain invert brightness-0'
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Clients;
