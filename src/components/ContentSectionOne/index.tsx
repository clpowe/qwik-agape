import { component$, useStylesScoped$ } from '@builder.io/qwik'
import styles from './ContentSectionOne.module.css?inline'

interface ContentSectionOneProps {
	eyebrow: string
	heading: string
	body: string
	img: string
}

export default component$<ContentSectionOneProps>(
	({ eyebrow, heading, body, img }) => {
		useStylesScoped$(styles)
		return (
			<section class='section'>
				<div class='container mx-auto px-4 holder'>
					<p>{eyebrow}</p>
					<div>
						<h2>{heading}</h2>
						<p>
							{body}
							{img}
						</p>
					</div>
					<img
						src='/public/pexels-stanley-morales-3186386.jpg'
						class='rounded-3xl'
						alt=''
					/>
				</div>
			</section>
		)
	}
)
