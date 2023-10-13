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
		<section
			class='hero hero-img hero is-medium has-text-warning'
			data-theme='dark'
		>
			<Navigation />

			<header class='hero-body'>
				<h1 class='title is-1 has-text-white has-text-weight-medium '>
					{headline}
				</h1>
				<p class='subtitle is-4 has-text-white'>{subheading}</p>
				<p>
					<a href='' role='button' class='button is-primary'>
						Apply Now
					</a>
				</p>
			</header>
		</section>
	)
})
