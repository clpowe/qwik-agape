import { component$, useStylesScoped$ } from '@builder.io/qwik'
import Title from '../Title'
import Body from '../Body'
import style from './ContentSectionTwo.css?inline'

interface ContentSectionOneProps {
	heading: string
	headingSecondary: string
	body1: string
	body2: string
}

export default component$<ContentSectionOneProps>(
	({ heading, body1, body2, headingSecondary }) => {
		useStylesScoped$(style)
		return (
			<section>
				<div class='myContainer py-12'>
					<div class=' max-w-[30ch] mb-6'>
						<Title title={heading} titleSecondary={headingSecondary} />
					</div>
					<div class=' grid grid-cols-1 gap-6 md:grid-cols-2'>
						<Body text={body1} />
						<Body text={body2} />
					</div>
				</div>
			</section>
		)
	}
)
