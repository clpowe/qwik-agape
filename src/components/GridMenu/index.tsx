import { component$, useResource$, Resource } from '@builder.io/qwik'
import ClickableItem from '../ClickableItem'
import { getAllContent } from '@builder.io/sdk-qwik'

export const apiKey = 'a77f4a06dd2947ec9095c8f325ed362e'

export default component$(() => {
	const linksResource = useResource$(() =>
		getAllContent({
			model: 'services-menu',
			apiKey: 'a77f4a06dd2947ec9095c8f325ed362e'
		})
	)

	return (
		<div class='myContainer p-4 '>
			<Resource
				value={linksResource}
				onPending={() => <>Loading...</>}
				onRejected={(error) => <>Error: {error.message}</>}
				onResolved={(links: any) => {
					return (
						<nav class='grid grid-cols-2 gap-4 md:grid-cols-4'>
							{links.results.map((link: any) => (
								<>
									<ClickableItem text={link.name} href={link.data.link} />
								</>
							))}
						</nav>
					)
				}}
			/>
		</div>
	)
})
