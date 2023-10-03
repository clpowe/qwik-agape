import { component$, Slot } from '@builder.io/qwik'

import Footer from '~/components/Footer'

export default component$(() => {
	return (
		<div class=''>
			<main class='relative'>
				<Slot />
			</main>
			<Footer />
		</div>
	)
})
