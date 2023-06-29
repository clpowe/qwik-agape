import {
	component$,
	useResource$,
	Resource,
	useSignal,
	$,
	useStylesScoped$
	// useVisibleTask$
} from '@builder.io/qwik'

import { getAllContent } from '@builder.io/sdk-qwik'
import { animate } from 'motion'
import style from './Navigation.css?inline'

export const apiKey = 'a77f4a06dd2947ec9095c8f325ed362e'

export default component$(() => {
	useStylesScoped$(style)
	const menuRef: any = useSignal<Element>()

	const openDrawer = $(() => {
		menuRef.value.showModal()
		animate(menuRef.value, { transform: 'translateY(0%)' })
		const body = document.body
		const scrollY =
			document.documentElement.style.getPropertyValue('--scroll-y')
		body.style.top = `-${scrollY}`
		body.style.position = 'fixed'
	})

	const closeDrawer = $(() => {
		animate(menuRef.value, { transform: 'translateY(-100%)' }).finished.then(
			() => {
				menuRef.value.close()
				const body = document.body
				body.style.position = ''
			}
		)
	})

	const linksResource = useResource$(() =>
		getAllContent({
			model: 'nav-link',
			apiKey: 'a77f4a06dd2947ec9095c8f325ed362e'
		})
	)

	return (
		<>
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
					<Resource
						value={linksResource}
						onPending={() => <>Loading...</>}
						onRejected={(error) => <>Error: {error.message}</>}
						onResolved={(links: any) => (
							<div class='flex items-center gap-2 text-white '>
								<nav class='hidden md:flex gap-4'>
									{links.results.map((link: any, index: number) => (
										<a key={index} href={link.data.url}>
											{link.data.text}
										</a>
									))}
								</nav>
								<button
									class='flex md:hidden font-bold gap-2 items-center'
									onClick$={openDrawer}
								>
									Menu
									<div class='i-mdi-microsoft-xbox-controller-menu text-2xl' />
								</button>
							</div>
						)}
					/>
				</nav>
			</div>
			<dialog
				class=' text-white'
				ref={menuRef}
				onClick$={(e: any) => {
					if (e.target.nodeName === 'DIALOG') {
						closeDrawer()
					}
				}}
			>
				<nav class='grid p-4 gap-6 font-bold justify-end items-end text-end'>
					<button
						class='flex md:hidden font-bold gap-2 items-center justify-end'
						onClick$={closeDrawer}
					>
						close
						<div class='i-mdi-close text-2xl' />
					</button>
					<Resource
						value={linksResource}
						onPending={() => <>Loading...</>}
						onRejected={(error) => <>Error: {error.message}</>}
						onResolved={(links: any) => (
							<>
								{links.results.map((link: any, index: any) => (
									<a key={index} href={link.data.url} class='text-3xl '>
										{link.data.text}
									</a>
								))}
							</>
						)}
					/>
				</nav>
			</dialog>
		</>
	)
})
