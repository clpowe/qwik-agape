import { component$ } from '@builder.io/qwik'
import { FeatureItem } from '../FeatureItem'
import Title from '../Title'

interface FeatureProps {
	body1: string
	body2: string
	body3: string
}

export default component$<FeatureProps>(({ body1, body2, body3 }) => {
	return (
		<section class='text-black body-font'>
			<div class='container max-w-7xl px-5 py-12 mx-auto'>
				<div class='mb-4'>
					<Title title='The Path' titleSecondary='to Esquire' />
				</div>
				<div class='flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6'>
					<FeatureItem number='1' body={body1} />
					<FeatureItem number='2' body={body2} />
					<FeatureItem number='3' body={body3} />
				</div>
			</div>
		</section>
	)
})
