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

			<div className='flex flex-wrap items-center py-10 justify-center gap-4 md:gap-8'>
				{companies.map((company) => (
					<div key={company.id} className='flex justify-center items-center w-20 sm:w-28 md:w-32'>
						<Image
							width={100}
							height={100}
							src={company.img}
							alt={company.name}
							className='w-full h-auto object-contain'
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Clients;
