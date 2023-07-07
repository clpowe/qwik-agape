import { component$ } from '@builder.io/qwik'

interface InnerHeroProps {
	headline: string

	image: string
}

export default component$<InnerHeroProps>(({ headline, image }) => {
	return (
		<div class='relative h-[24rem] overflow-hidden bg-black'>
			<div class='container max-w-7xl mx-auto absolute w-full h-full grid place-content-center'>
				<h1 class='text-5xl'>{headline}</h1>
			</div>

			<img
				src={image}
				alt=''
				height='384'
				class='h-full w-full object-cover object-center-top opacity-50 '
			/>
		</div>
	)
})
