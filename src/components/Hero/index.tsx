import { component$, useStylesScoped$ } from '@builder.io/qwik'
import style from './hero.css?inline'
import Navigation from '../Navigation'

interface HeroProps {
	headline: string
	subheading: string
}

export default component$<HeroProps>(({ headline, subheading }) => {
	useStylesScoped$(style)

	return (
		<>
			<Navigation />
			<div class='hero relative  top-0 grid  h-[38rem] bg-cover bg-top p-4 items-end pb-[min(7vw,3rem)]'>
				<div class='text-white myContainer flex flex-col gap-4 p-0 md:p-4 '>
					<h1 class='max-w-[12ch] font-bold  headline'>{headline}</h1>
					<p class='max-w-sm'>{subheading}</p>
					<button class=' w-40 font-bold uppercase bg-red-800 py-4 px-5 rounded-md '>
						Apply Now
					</button>
				</div>
			</div>
		</>
	)
})
