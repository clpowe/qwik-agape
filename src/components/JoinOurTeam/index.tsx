import { component$ } from '@builder.io/qwik'
import Title from '../Title'

export default component$(() => {
	return (
		<div class='section p-4 container mx-auto max-w-4xl flex flex-col gap-4  justify-center md:flex-row md:items-end'>
			<Title
				eyebrow='We are hiring'
				title='Join the'
				titleSecondary='Agape family'
			/>
			<button class=' w-40 font-bold uppercase bg-red-800 py-4 px-5 rounded-md h-10 grid place-content-center text-white'>
				Apply Now
			</button>
		</div>
	)
})
