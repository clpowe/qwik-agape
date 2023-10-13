import { component$ } from '@builder.io/qwik'
import Navigation from '../Navigation'

interface InnerHeroProps {
	headline: string
	subtitle?: string
	image?: string
}

export default component$<InnerHeroProps>(({ headline, subtitle }) => {
	return (
		<section class='hero is-medium has-background-dark'>
			<Navigation />

			<div class='hero-body has-text-centered'>
				<h1 class='title has-text-white'>{headline}</h1>
				<p class='subtitle has-text-white'>{subtitle}</p>
			</div>
		</section>
	)
})
