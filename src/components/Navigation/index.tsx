import ImgAgape from '~/media/agape.svg?jsx'
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
		animate(menuRef.value, { transform: 'translateY(0%)' }).finished.then(
			() => {
				const body = document.body
				body.style.overflow = 'hidden'
			}
		)
	})

	const closeDrawer = $(() => {
		animate(menuRef.value, { transform: 'translateY(-100%)' }).finished.then(
			() => {
				menuRef.value.close()
				const body = document.body
				body.style.overflow = 'auto'
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
			<div data-theme='dark'>
				<div class='bg-black '>
					<hgroup>
						<div class='container mx-auto px-4 text-white text-xs text-center py-2 md:text-end'>
							admin@agapechristianbarprep.com
						</div>
					</hgroup>
				</div>

				<nav class='navbar px-4 is-transparent'>
					<div class='container !flex'>
						<div class='navbar-brand'>
							<div class='flex items-center'>
								<ImgAgape class='w-10' alt='Agape Christian Bar Prep Logo' />
								<span class='hidden md:block text-white ml-4'>
									Agape Christian Bar Prep
								</span>
							</div>
						</div>

						<div id='navbarMenuHeroA' class='navbar-menu'>
							<div class='navbar-end'>
								<Resource
									value={linksResource}
									onPending={() => <>Loading...</>}
									onRejected={(error) => <>Error: {error.message}</>}
									onResolved={(links: any) => (
										<>
											{links.results.map((link: any, index: number) => (
												<a
													key={index}
													href={link.data.url}
													class='navbar-item uppercase  text-white hover:text-red-9 hover:border-b-4 hover:border-[var(--primary)] hover:border-b-6 hover:translate-y-[3px] '
												>
													{link.data.text}
												</a>
											))}
										</>
									)}
								/>
							</div>
						</div>
						<span
							data-target='navbarMenuHeroA'
							class='ml-auto navbar-burger  w-[fit-content] '
						>
							<button
								class='flex gap-2 text-white bg-transparent '
								onClick$={openDrawer}
							>
								<div class='i-mdi-microsoft-xbox-controller-menu text-2xl ' />
								Menu
							</button>
						</span>
					</div>
				</nav>
			</div>
			<dialog
				class='block text-white'
				ref={menuRef}
				onClick$={(e: any) => {
					if (e.target.nodeName === 'DIALOG') {
						closeDrawer()
					}
				}}
			>
				<nav class='grid p-4 gap-6 font-bold justify-end items-end text-end'>
					<button
						class='flex  font-bold gap-2 items-center justify-end'
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
									<a
										key={index}
										href={link.data.url}
										class='navbar-item is-primary bg-black '
									>
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
