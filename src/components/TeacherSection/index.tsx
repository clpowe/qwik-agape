import {
	component$,
	useStylesScoped$,
	useResource$,
	Resource
} from '@builder.io/qwik'
import TeacherCard from '../TeacherCard'
import style from './teacherSection.css?inline'

import { getAllContent } from '@builder.io/sdk-qwik'

export const apiKey = 'a77f4a06dd2947ec9095c8f325ed362e'

export default component$(() => {
	useStylesScoped$(style)

	const teachersResource = useResource$(() =>
		getAllContent({
			model: 'teachers',
			apiKey: apiKey
		})
	)

	return (
		<section>
			<div class='myContainer grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-6'>
				<Resource
					value={teachersResource}
					onPending={() => <>Loading...</>}
					onRejected={(error) => <>Error: {error.message}</>}
					onResolved={(teachers: any) => {
						return (
							<>
								{teachers?.results.map((teacher: any) => {
									return (
										<TeacherCard
											key={teacher.id}
											name={teacher.data.name}
											expertise={teacher.data.expertiselist}
											image={teacher.data.thumbnail}
										/>
									)
								})}
							</>
						)
					}}
				/>
			</div>
		</section>
	)
})
