import { component$ } from '@builder.io/qwik'
import Navigation from '../Navigation'

export default component$(() => {
	return (
		<>
			<Navigation />
			<div class='relative h-[10rem] overflow-hidden bg-black flex place-content-center'></div>
		</>
	)
})
