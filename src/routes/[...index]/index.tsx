import { component$, useStore } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import {
	getContent,
	RenderContent,
	getBuilderSearchParams,
	type RegisteredComponent
} from '@builder.io/sdk-qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export const BUILDER_PUBLIC_API_KEY = 'a77f4a06dd2947ec9095c8f325ed362e' // <-- Add your Builder public API key here
export const BUILDER_MODEL = 'page'

export const MyHeroComponent = component$((props: { text: string }) => {
	return (
		<div class='relative top-0 grid bg-[url("/HeroImage.png")] h-[38rem] bg-cover bg-center items-end p-4'>
			<div class='text-white flex flex-col gap-4'>
				<h1 class='text-5xl font-bold  w-2/3'>{props.text}</h1>
				<p>
					We specialize in helping students overcome barriers to learning so
					they can fully develop their intellectual potential.
				</p>
				<button class=' w-40 font-bold uppercase bg-red-800 py-4 px-5 rounded-md '>
					Apply Now
				</button>
			</div>
		</div>
	)
})

// You will find these components in the "custom components"
// section of the visual editor
// You can also turn on "components only mode" to limit
// editing to only these components
// https://www.builder.io/c/docs/guides/components-only-mode
export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
	{
		component: MyHeroComponent,
		name: 'MyHeroComponent',
		inputs: [
			{
				name: 'text',
				type: 'string',
				defaultValue: 'Hello world'
			}
		]
	}
]

// Use Qwik City's `useBuilderContent` to get your content from Builder.
// `routeLoader$()` takes an async function to fetch content
// from Builder with `getContent()`.
export const useBuilderContent = routeLoader$(async ({ url, error }) => {
	const isPreviewing = url.searchParams.has('builder.preview')

	const builderContent = await getContent({
		model: BUILDER_MODEL,
		apiKey: BUILDER_PUBLIC_API_KEY,
		options: getBuilderSearchParams(url.searchParams),
		userAttributes: {
			urlPath: url.pathname
		}
	})

	// If there's no content, throw a 404.
	// You can use your own 404 component here
	if (!builderContent && !isPreviewing) {
		throw error(404, 'Page not found')
	}
	// return content fetched from Builder, which is JSON
	return builderContent
})

export default component$(() => {
	const content = useBuilderContent()
	return (
		<>
			<RenderContent
				model={BUILDER_MODEL}
				content={content.value}
				apiKey={BUILDER_PUBLIC_API_KEY}
				customComponents={CUSTOM_COMPONENTS}
			/>
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
