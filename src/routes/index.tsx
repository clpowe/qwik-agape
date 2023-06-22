import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
	return (
		<>
			<div class='relative top-0 grid bg-[url("/HeroImage.png")] h-[38rem] bg-cover bg-center items-end p-4'>
				<div class='text-white flex flex-col gap-4'>
					<h1 class='text-5xl font-bold  w-2/3'>
						Bar prep that’s starts with you
					</h1>
					<p>
						We specialize in helping students overcome barriers to learning so
						they can fully develop their intellectual potential.
					</p>
					<button class=' w-40 font-bold uppercase bg-red-800 py-4 px-5 rounded-md '>
						Apply Now
					</button>
				</div>
			</div>
		</>
	)
})

export const head: DocumentHead = {
	title: 'Agape Christian Bar Prep',
	meta: [
		{
			name: 'description',
			content: 'Qwik site description'
		}
	]
}
