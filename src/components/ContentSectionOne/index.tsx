import { component$, useStylesScoped$ } from '@builder.io/qwik'
import style from './ContentSectionOne.css?inline'

interface ContentSectionOneProps {
	heading: string
	body: string
	img: string
	ctaText: string
}

export default component$<ContentSectionOneProps>(
	({ heading, body, img, ctaText }) => {
		useStylesScoped$(style)
		return (
			<section class='section'>
				<div class='container mx-auto px-4 grid grid-cols-1 md:grid-cols-2'>
					<div>
						<h2 class='text-4xl font-bold max-w-[10ch]'>{heading}</h2>
						<p class='text-base text-gray-500 '>{body}</p>
						<button>{ctaText}</button>
					</div>

					<img
						src='/gradsm.jpg'
						class='rounded-3xl h-[14.5rem] w-full object-cover md:h-[27rem]'
						alt=''
						height={300}
					/>
				</div>
			</section>
		)
	}
)
