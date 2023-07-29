import { component$, Slot } from '@builder.io/qwik'

import Footer from '~/components/Footer'

export default component$(() => {
	return (
		<>
			<main class='relative'>
				<Slot />
			</main>
			<Footer />
		</>
	)
})
