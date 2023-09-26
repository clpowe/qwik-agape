import { component$ } from '@builder.io/qwik'

import Title from '~/components/Title'
import Body from '~/components/Body'

type Link = {
	text: string
	link: string
}

interface SectionProps {
	heading: string
	headingSecondary: string
	body: string
	links?: Link[]
}

export default component$<SectionProps>(
	({ heading, headingSecondary, body, links }) => {
		return (
			<section class='container'>
				<Title title={heading} titleSecondary={headingSecondary} />
				<Body text={body} />
				<div class='grid grid-flow-dense sm:grid-cols-2 md:grid-cols-4 gap-4'>
					{links &&
						links.map((link) => (
							<a role='button' href={link.link} key={link.text}>
								{link.text}
							</a>
						))}
				</div>
			</section>
		)
	}
)
