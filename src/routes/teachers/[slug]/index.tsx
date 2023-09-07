import { Resource, component$, $ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import { getAllContent } from '@builder.io/sdk-qwik'
import { Image, type ImageTransformerProps, useImageProvider } from 'qwik-image'

import InnerHero from '~/components/TeacherHero'

export const apiKey = 'a77f4a06dd2947ec9095c8f325ed362e'

export const useProductLoader = routeLoader$(async ({ params, status }) => {
	const data = getAllContent({
		model: 'teachers',
		apiKey: apiKey,
		query: {
			data: {
				slug: params.slug
			}
		}
	})

	if (!data) {
		status(404)
	}
	return data
})

export default component$(() => {
	const teacher = useProductLoader()

	const imageTransformer$ = $(
		({ src, height }: ImageTransformerProps): string => {
			// Here you can set your favorite image loaders service
			return `${src}?tr=h-${height}`
		}
	)

	// Global Provider (required)
	useImageProvider({
		// You can set this prop to overwrite default values [3840, 1920, 1280, 960, 640]
		resolutions: [3840, 1920, 1280, 960, 640],
		imageTransformer$
	})

	return (
		<>
			<Resource
				value={teacher}
				onPending={() => <>Loading...</>}
				onRejected={(error) => <>Error: {error.message}</>}
				onResolved={(teacher: any) => {
					return (
						<>
							<InnerHero />

							<main class='myContainer flex flex-col gap-16 my-16'>
								<div class='flex flex-col md:flex-row md:flex gap-8'>
									<Image
										layout='fixed'
										objectFit='cover'
										width={400}
										height={500}
										alt={`A photo of ${teacher.results[0].data.name}`}
										placeholder='#e6e6e6'
										class='object-bottom rounded-6 '
										src={teacher.results[0].data.bimage}
									/>
									<div>
										<h1 class='text-7xl font-bold'>
											{teacher.results[0].data.name}
										</h1>
										<p class='text-2xl font-bold'>
											{teacher.results[0].data.title}
										</p>
									</div>
								</div>
								<section>
									<h2 class='font-bold text-2xl '>Teacher Bio</h2>
									<div
										class='columns-1 md:columns-2'
										dangerouslySetInnerHTML={teacher.results[0].data.bio}
									></div>
								</section>
								<div class='grid gap-4 customGrid'>
									<div>
										<h3 class='text-xl font-bold '>Bar Admission</h3>
										<ul>
											{teacher.results[0].data.education.map((e: any) => {
												return <li key={e.school}>{e.school}</li>
											})}
										</ul>
									</div>
									<div>
										<h3 class='text-xl font-bold '>Expertise</h3>
										<ul>
											{teacher.results[0].data.expertiselist.map((e: any) => {
												return <li key={e.expertise}>{e.expertise}</li>
											})}
										</ul>
									</div>
									<div>
										<h3 class='text-xl font-bold '>Education</h3>
										<ul>
											{teacher.results[0].data.barAdmissions.map((e: any) => {
												return <li key={e.admission}>{e.admission}</li>
											})}
										</ul>
									</div>
								</div>
							</main>
						</>
					)
				}}
			/>
		</>
	)
})
