import { component$ } from '@builder.io/qwik'
import Navigation from '../Navigation'

interface InnerHeroProps {
	headline: string
	image: string
}

export default component$<InnerHeroProps>(({ headline, image }) => {
	return (
		<>
			<Navigation />
			<div class='relative h-[24rem] overflow-hidden bg-black flex place-content-center'>
				<div class='px-4  container max-w-7xl mx-auto absolute w-full h-full grid items-end'>
					<h1 class='text-5xl z-10 font-bold text-white mb-[10%] container max-w-7xl mx-auto'>
						{headline}
					</h1>
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
