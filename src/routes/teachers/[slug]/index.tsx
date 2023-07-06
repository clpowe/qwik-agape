import { Resource, component$, useResource$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import { getAllContent } from '@builder.io/sdk-qwik'

export const apiKey = 'a77f4a06dd2947ec9095c8f325ed362e'

export const useProductLoader = routeLoader$(async ({ params, status }) => {
	const data = params.slug

	if (!data) {
		status(404)
	}
	return data
})

export default component$(() => {
	const slug = useProductLoader()

	const teacherResource = useResource$(() =>
		getAllContent({
			model: 'teachers',
			apiKey: apiKey,
			query: {
				data: {
					slug: slug.value
				}
			}
		})
	)

	return (
		<>
			<div class='h-40 bg-black'></div>
			<Resource
				value={teacherResource}
				onPending={() => <>Loading...</>}
				onRejected={(error) => <>Error: {error.message}</>}
				onResolved={(teacher: any) => {
					return (
						<>
							<div class='h-screen'>{teacher.results[0].data.name}</div>
						</>
					)
				}}
			/>
		</>
	)
})
