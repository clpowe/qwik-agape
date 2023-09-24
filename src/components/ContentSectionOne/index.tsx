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
			({ src, height }: ImageTransformerProps): string => {
				// Here you can set your favorite image loaders service
				return `https://ik.imagekit.io/cpds/Agape_Christian/${src}?tr=h-${height}`
			}
		)

		// Global Provider (required)
		useImageProvider({
			// You can set this prop to overwrite default values [3840, 1920, 1280, 960, 640]
			resolutions: [3840, 1920, 1280, 960, 640],
			imageTransformer$
		})

		return (
			<section class='section w-full'>
				<div class='container mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 '>
					<div class=''>
						<Title title={heading} titleSecondary={headingSecondary} />
						<Body text={body} />
						<a href='' role='button'>
							{ctaText}
						</a>
					</div>

					<Image
						src={img}
						layout='constrained'
						objectFit='cover'
						class='rounded-3xl  w-full  object-top h-[24rem]'
						alt=''
						width={1280}
						height={1000}
					/>
				</div>
			</section>
		)
	}
)
