import { Resource, component$, $ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import { getAllContent } from '@builder.io/sdk-qwik'
import { Image, type ImageTransformerProps, useImageProvider } from 'qwik-image'
import styles from './teachers.module.css'

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
			return `https://ik.imagekit.io/cpds/Agape_Christian/${src}?tr=h-${height}`
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
			<div class='h-40 bg-black'></div>
			<Resource
				value={teacher}
				onPending={() => <>Loading...</>}
				onRejected={(error) => <>Error: {error.message}</>}
				onResolved={(teacher: any) => {
					console.log(teacher.results[0].data.bimage)
					return (
						<>
							<div class='myContainer max-w-4xl'>
								<h1 class={[styles.test, 'font-bold', 'text-5xl']}>
									{teacher.results[0].data.name}
								</h1>
								<div class='font-bold text-lg'>
									{teacher.results[0].data.title}
								</div>
							</div>
							<main class='flex flex-col myContainer max-w-4xl md:flex-row gap-6'>
								<div class='min-w-a md:min-w-[340px]'>
									<img
										//layout='fixed'
										//objectFit='cover'
										width={400}
										height={500}
										alt={`A photo of ${teacher.results[0].data.name}`}
										placeholder='#e6e6e6'
										class='object-bottom rounded-6'
										src={teacher.results[0].data.bimage}
									/>
									<div class='grid gap-4'>
										<details open>
											<summary>Education</summary>
											<ul>
												{teacher.results[0].data.barAdmissions.map((e: any) => {
													return <li key={e.admission}>{e.admission}</li>
												})}
											</ul>
										</details>
										<details open>
											<summary>Bar Admission</summary>
											<ul>
												{teacher.results[0].data.education.map((e: any) => {
													return <li key={e.school}>{e.school}</li>
												})}
											</ul>
										</details>
										<details open>
											<summary>Expertise</summary>
											<ul>
												{teacher.results[0].data.expertiselist.map((e: any) => {
													return <li key={e.expertise}>{e.expertise}</li>
												})}
											</ul>
										</details>
									</div>
								</div>
								<div class='space-y-8'>
									<div>
										<h2 class='font-bold text-2xl '>Teacher Bio</h2>
										<div
											dangerouslySetInnerHTML={teacher.results[0].data.bio}
										></div>
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
