import { component$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'

type Expertise = { expertise: string }
interface TeacherCardProps {
	name: string
	expertise: Expertise[]
	image: string
	slug: string
}

export default component$<TeacherCardProps>(
	({ name, expertise, image, slug }) => {
		return (
			<Link class='card' href={`/teachers/${slug}`}>
				<div class='card-image'>
					<figure class='image '>
						<img src={image} alt='' height='400' width='300' />
					</figure>
				</div>
				<div class='content'>
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
			</Link>
		)
	}
)
