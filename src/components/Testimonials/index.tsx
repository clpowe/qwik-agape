import type { SwiperOptions } from 'swiper/types'
import { register } from 'swiper/element/bundle'
import {
	component$,
	useStylesScoped$,
	useVisibleTask$,
	useResource$,
	Resource
} from '@builder.io/qwik'
import Title from '~/components/Title'

import style from './testimonials.css?inline'

import { getAllContent } from '@builder.io/sdk-qwik'

export const apiKey = 'a77f4a06dd2947ec9095c8f325ed362e'

export default component$(() => {
	useStylesScoped$(style)

	useVisibleTask$(() => {
		register()
		const swiperEl: any = document.querySelector('swiper-container')
		const swiperParams: SwiperOptions = {
			slidesPerView: 1,
			breakpoints: {
				'375': {
					slidesPerView: 1.25,
					spaceBetween: 30
				},
				'768': {
					slidesPerView: 2.25,
					spaceBetween: 30
				},
				'1024': {
					slidesPerView: 3.25,
					spaceBetween: 30
				}
			},
			on: {
				init() {
					// ...
				}
			}
		}
		Object.assign(swiperEl, swiperParams)

		// and now initialize it
		if (swiperEl != null) {
			swiperEl.initialize()
		}
	})

	const testimonialsResource = useResource$(() =>
		getAllContent({
			model: 'testimonials',
			apiKey: 'a77f4a06dd2947ec9095c8f325ed362e'
		})
	)

	return (
		<>
			<div class='container max-w-7xl mx-auto p-4'>
				<Title
					eyebrow='What People Say About Us'
					title='Student'
					titleSecondary='Testimonials'
				/>
			</div>
			<swiper-container speed='500' init='false' free-mode='true' loop='true'>
				<Resource
					value={testimonialsResource}
					onPending={() => <>Loading...</>}
					onRejected={(error) => <>Error: {error.message}</>}
					onResolved={(links: any) => (
						<>
							{links?.results.map((link: any) => (
								<swiper-slide
									key={link.id}
									class=' grid p-8  card rounded-3xl h-auto bg-gray-1 w-[300px]'
								>
									<p class='text-sm'>{link.data.testimonial}</p>
									<p class='font-bold text-md place-self-end mt-4'>
										{link.data.name}
									</p>
								</swiper-slide>
							))}
						</>
					)}
				/>
			</swiper-container>
		</>
	)
})