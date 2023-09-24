import { component$ } from '@builder.io/qwik'
import Navigation from '../Navigation'

interface InnerHeroProps {
	headline: string
	subtitle?: string
	image?: string
}

export default component$<InnerHeroProps>(({ headline, subtitle }) => {
	return (
		<div class='hero bg-black' data-theme='dark'>
			<Navigation />

			<header class='container'>
				<hgroup>
					<h1 class='max-w-[12ch] font-bold  headline'>{headline}</h1>
					<p class='max-w-sm'>{subtitle}</p>
				</hgroup>
			</header>
		</div>
	)
})
