import { component$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import {
	getContent,
	RenderContent,
	getBuilderSearchParams
} from '@builder.io/sdk-qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { CUSTOM_COMPONENTS } from '~/components/builder-registry'

export const BUILDER_PUBLIC_API_KEY = 'a77f4a06dd2947ec9095c8f325ed362e' // <-- Add your Builder public API key here
export const BUILDER_MODEL = 'page'

// You will find these components in the "custom components"
// section of the visual editor
// You can also turn on "components only mode" to limit
// editing to only these components
// https://www.builder.io/c/docs/guides/components-only-mode

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
