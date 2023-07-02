import { component$, useStylesScoped$ } from '@builder.io/qwik'
import style from './teacherCard.css?inline'

type Expertise = { expertise: string }
interface TeacherCardProps {
	name: string
	expertise: Expertise[]
	image: string
}

export default component$<TeacherCardProps>(({ name, expertise, image }) => {
	useStylesScoped$(style)
	return (
		<div class='card'>
			<img src={image} alt='' class='rounded-xl' height='300' width='300' />
			<div class='p-2'>
				<h3 class='text-2xl uppercase font-bold mb-2'>{name}</h3>
				<div class='space-y-1'>
					<p class='font-bold uppercase'>Expertise</p>
					<ul>
						{expertise.map((e) => (
							<li key={e.expertise} class='text-gray-6'>
								{e.expertise}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
})
