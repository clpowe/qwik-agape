import { component$, useStylesScoped$, $ } from '@builder.io/qwik'
import { Image, type ImageTransformerProps, useImageProvider } from 'qwik-image'

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

		const imageTransformer$ = $(
			({ src, width, height }: ImageTransformerProps): string => {
				// Here you can set your favorite image loaders service
				return `https://ik.imagekit.io/cpds/Agape_Christian/${src}?tr=w-${width},h-${height}`
			}
		)

		// Global Provider (required)
		useImageProvider({
			// You can set this prop to overwrite default values [3840, 1920, 1280, 960, 640]
			resolutions: [3840, 1920, 1280, 960, 640],
			imageTransformer$
		})

		return (
			<section class='section'>
				<div class='myContainer grid grid-cols-1 gap-6 md:grid-cols-2 '>
					<div class='space-y-4'>
						<Title title={heading} titleSecondary={headingSecondary} />
						<Body text={body} />
						<button>{ctaText}</button>
					</div>

					<Image
						src={img}
						layout='constrained'
						class='rounded-3xl h-[14.5rem] w-full object-cover object-top md:h-[27rem]'
						alt=''
						width={400}
						height={500}
					/>
				</div>
			</section>
		)
	}
)
