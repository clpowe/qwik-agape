import { component$ } from '@builder.io/qwik'
import TeacherCard from '../TeacherCard'

export default component$(() => {
	return (
		<section>
			<div class='myContainer'>
				<TeacherCard />
				<TeacherCard />
				<TeacherCard />
				<TeacherCard />
				<TeacherCard />
			</div>
		</section>
	)
})
