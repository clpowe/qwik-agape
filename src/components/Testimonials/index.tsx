import {
	component$,
	useStylesScoped$,
	useResource$,
	Resource,
	useSignal,
	useVisibleTask$
} from '@builder.io/qwik'
import Title from '~/components/Title'

import style from './testimonials.css?inline'

import { getAllContent } from '@builder.io/sdk-qwik'

export const apiKey = 'a77f4a06dd2947ec9095c8f325ed362e'

export default component$(() => {
	useStylesScoped$(style)
	const scrollerRef = useSignal<HTMLElement>()
	const scrollerInnerRef = useSignal<HTMLElement>()

	useVisibleTask$(() => {
		if (!window.matchMedia('(perfers-reduced-motion: reduced)').matches) {
			addAnimation()
		}

		function addAnimation() {
			scrollerRef.value?.setAttribute('data-animated', 'true')

			if (scrollerInnerRef.value) {
				const scrollerContent = Array.from(scrollerInnerRef.value?.children)

				scrollerContent.forEach((item) => {
					const duplicatedItem = item.cloneNode(true) as HTMLElement
					duplicatedItem.setAttribute('aria-hidden', 'true')
					scrollerInnerRef.value?.appendChild(duplicatedItem)
				})
			}
		}
	})

	const testimonialsResource = useResource$(() =>
		getAllContent({
			model: 'testimonials',
			apiKey: 'a77f4a06dd2947ec9095c8f325ed362e'
		})
	)

	return (
		<section class='section grid place-content-center'>
			<div class='container mx-auto'>
				<Title
					eyebrow='What People Say About Us'
					title='Student'
					titleSecondary='Testimonials'
				/>
			</div>
			<div class='scroller' ref={scrollerRef}>
				<Resource
					value={testimonialsResource}
					onPending={() => <>Loading...</>}
					onRejected={(error) => <>Error: {error.message}</>}
					onResolved={(links: any) => (
						<ul class='tag-list scroller__inner' ref={scrollerInnerRef}>
							{links?.results.map((link: any) => (
								<li key={link.id} class='card carddesign'>
									<div class='card-content'>
										<p class=''>{link.data.testimonial}</p>
										<p class='subtitle !font-bold'>{link.data.name}</p>
									</div>
								</li>
							))}
						</ul>
					)}
				/>
			</div>
		</section>
	)
})
