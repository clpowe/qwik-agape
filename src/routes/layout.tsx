import { component$, Slot } from '@builder.io/qwik'

import Navigation from '~/components/Navigation'
import Footer from '~/components/Footer'

export default component$(() => {
	return (
		<>
			<Navigation />
			<mai class='relative'>
				<Slot />
			</mai>
			<Footer />
		</>
	)
})
