import { component$, useStylesScoped$ } from '@builder.io/qwik'
import style from './hero.css?inline'

interface HeroProps {
	headline: string
	subheading: string
}

export default component$<HeroProps>(({ headline, subheading }) => {
	useStylesScoped$(style)

	return (
		<div class='hero relative   top-0 grid  h-[38rem] bg-cover bg-top items-end p-4 pb-[20%] md:items-center pb-4'>
			<div class='text-white max-w-7xl flex flex-col gap-4 container mx-auto mb-16 p-0 md:p-4 md:mt-8 md:mb-0'>
				<h1 class='max-w-[12ch] font-bold  headline'>{headline}</h1>
				<p class='max-w-sm'>{subheading}</p>
				<button class=' w-40 font-bold uppercase bg-red-800 py-4 px-5 rounded-md '>
					Apply Now
				</button>
			</div>
		</div>
	)
})
