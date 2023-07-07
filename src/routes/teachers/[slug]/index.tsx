import { Resource, component$, useResource$, $ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import { getAllContent } from '@builder.io/sdk-qwik'
import { Image, type ImageTransformerProps, useImageProvider } from 'qwik-image'

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

	const imageTransformer$ = $(
		({ src, width, height }: ImageTransformerProps): string => {
			// Here you can set your favorite image loaders service
			return `https://ik.imagekit.io/cpds/Agape_Christian/${src}?tr=w-${width},h-${height}`
		}
	)

	// Global Provider (required)
	useImageProvider({
		// You can set this prop to overwrite default values [3840, 1920, 1280, 960, 640]
		// resolutions: [640],
		imageTransformer$
	})

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
							<Image
								layout='constrained'
								objectFit='cover'
								width={400}
								height={500}
								alt='Tropical paradise'
								placeholder='#e6e6e6'
								class='object-bottom rounded-6'
								src={teacher.results[0].data.mainImage}
							/>
							<h1 class=''>{teacher.results[0].data.name}</h1>
							<div class=''>{teacher.results[0].data.title}</div>
							<h2>Education</h2>
							<h2>Bar Admissions</h2>
							<h2>Expertise</h2>
							<h2>Bio</h2>
							<div dangerouslySetInnerHTML={teacher.results[0].data.bio}></div>
						</>
					)
				}}
			/>
		</>
	)
})
