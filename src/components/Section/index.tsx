import { component$ } from '@builder.io/qwik'

import Title from '~/components/Title'
import Body from '~/components/Body'

interface SectionProps {
	heading: string
	headingSecondary: string
	body: string
}

export default component$<SectionProps>(
	({ heading, headingSecondary, body }) => {
		return (
			<section class='myContainer space-y-4 '>
				<Title title={heading} titleSecondary={headingSecondary} />
				<Body text={body} />
			</section>
		)
	}
)
