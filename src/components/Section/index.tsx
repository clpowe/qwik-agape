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
			<section class='container max-w-7xl mx-auto p-4 space-y-4 '>
				<Title title={heading} titleSecondary={headingSecondary} />
				<Body text={body} />
			</section>
		)
	}
)