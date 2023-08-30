import { component$ } from '@builder.io/qwik'
import Navigation from '../Navigation'

interface InnerHeroProps {
	headline: string
	subtitle: string
	image?: string
}

export default component$<InnerHeroProps>(({ headline, image, subtitle }) => {
	return (
		<>
			<Navigation />
			<div class='relative h-[24rem] overflow-hidden bg-black flex place-content-center'>
				<div class='px-4  container max-w-7xl mx-auto absolute w-full h-full grid items-end'>
					<div class='z-10 mb-[10%] container max-w-7xl mx-auto'>
						<h1 class='text-5xl font-bold text-white '>{headline}</h1>
						<p class='font-bold text-lg text-white'>{subtitle}</p>
					</div>
				</div>

				<img
					src={image}
					height='384'
					class='h-full w-full object-cover object-center-top opacity-50 '
				/>
			</div>
		</>
	)
})
