import { component$, useStylesScoped$ } from '@builder.io/qwik'
import Title from '../Title'
import Body from '../Body'
import style from './ContentSectionOne.css?inline'

interface ContentSectionOneProps {
	heading: string
	headingSecondary: string
	body: string
	img: string
	ctaText: string
}

export default component$<ContentSectionOneProps>(
	({ heading, body, img, ctaText, headingSecondary }) => {
		useStylesScoped$(style)
		return (
			<section class='section'>
				<div class='myContainer grid grid-cols-1 gap-6 md:grid-cols-2 '>
					<div class='space-y-4'>
						<Title title={heading} titleSecondary={headingSecondary} />
						<Body text={body} />
						<button>{ctaText}</button>
					</div>

					<img
						src={img}
						class='rounded-3xl h-[14.5rem] w-full object-cover object-top md:h-[27rem]'
						alt=''
						width='1970'
						height='1814'
					/>
				</div>
			</section>
		)
	}
)
