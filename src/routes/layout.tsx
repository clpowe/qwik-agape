import { component$, Slot } from '@builder.io/qwik'

import Footer from '~/components/Footer'

export default component$(() => {
	return (
		<div class='flex flex-col h-full'>
			<main class='relative'>
				<Slot />
			</main>
			<Footer />
		</div>
	)
})
