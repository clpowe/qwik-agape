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
		<div class='hero hero-img' data-theme='dark'>
			<Navigation />

			<header class='container'>
				<hgroup>
					<h1 class='max-w-[12ch] font-bold  headline'>{headline}</h1>
					<p class='max-w-sm'>{subheading}</p>
					<p>
						<a href='' role='button'>
							Apply Now
						</a>
					</p>
				</hgroup>
			</header>
		</div>
	)
})
