import { component$, useResource$, Resource } from '@builder.io/qwik'

import { getAllContent } from '@builder.io/sdk-qwik'

export const apiKey = 'a77f4a06dd2947ec9095c8f325ed362e'

export default component$(() => {
	//const { pathname } = useLocation()

	const linksResource = useResource$(() =>
		getAllContent({
			model: 'nav-link',
			apiKey: 'a77f4a06dd2947ec9095c8f325ed362e'
		})
	)

	return (
		<Resource
			value={linksResource}
			onPending={() => <>Loading...</>}
			onRejected={(error) => <>Error: {error.message}</>}
			onResolved={(links) => (
				<div class='absolute top-0 left-0 w-full z-10'>
					<div class='bg-black '>
						<div class='container mx-auto px-4 text-white text-sm text-center py-2 md:text-end'>
							admin@agapechristianbarprep.com / 1-800-321-5588
						</div>
					</div>
					<nav class='container max-w-7xl flex justify-between p-4 uppercase mx-auto'>
						<div class='flex items-center'>
							<img
								src='/agape.svg'
								class='w-20'
								alt='Agape Christian Bar Prep Logo'
							/>
							<span class='hidden md:block text-white font-bold ml-4'>
								Agape Christian Bar Prep
							</span>
						</div>
						<div class='flex items-center gap-2 text-white '>
							<nav class='hidden md:flex gap-4'>
								{links.results.map((link, index) => (
									<a key={index} href={link.data.url}>
										{link.data.text}
									</a>
								))}
							</nav>
							<button class='flex md:hidden font-bold '>
								Menu
								<div class='i-mdi-microsoft-xbox-controller-menu text-2xl' />
								{/* <img src='/Menu.svg' alt='' /> */}
							</button>
						</div>
					</nav>
				</div>
			)}
		/>
	)
})
