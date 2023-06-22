import { component$ } from '@builder.io/qwik'

export default component$(() => {
	return (
		<div class='absolute top-0 left-0 w-full z-10'>
			<div class='bg-black '>
				<div class='container text-white text-sm text-center py-2 md:text-end'>
					admin@agapechristianbarprep.com / 1-800-321-5588
				</div>
			</div>
			<nav class='container flex justify-between p-4 uppercase mx-auto'>
				<div class='flex items-center'>
					<img
						src='/agapeLogo.svg'
						class='w-10'
						alt='Agape Christian Bar Prep Logo'
					/>
					<span class='hidden md:block'>Agape Christian Bar Prep</span>
				</div>
				<div class='flex items-center gap-2 font-bold text-white '>
					Menu
					<button>
						<img src='/Menu.svg' alt='' />
					</button>
				</div>
			</nav>
		</div>
	)
})
