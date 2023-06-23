import { component$ } from '@builder.io/qwik'

interface HeroProps {
	headline: string
	subheading: string
}

export default component$<HeroProps>(({ headline, subheading }) => {
	return (
		<div class='relative  top-0 grid bg-[url("/HeroImageMd.png")] h-[38rem] bg-cover bg-center items-end p-4 pb-[20%] md:items-center md:pb-4'>
			<div class='text-white flex flex-col gap-4 container mx-auto'>
				<h1 class='max-w-md text-5xl font-bold  w-2/3 lg:text-6xl'>
					{headline}
				</h1>
				<p class='max-w-sm'>{subheading}</p>
				<button class=' w-40 font-bold uppercase bg-red-800 py-4 px-5 rounded-md '>
					Apply Now
				</button>
			</div>
		</div>
	)
})
