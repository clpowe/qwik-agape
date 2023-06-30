import { component$ } from '@builder.io/qwik'

interface FeatureItemProps {
	number: string
	body: string
}

export const FeatureItem = component$<FeatureItemProps>(({ number, body }) => {
	return (
		<div class='p-4 md:w-1/3 flex'>
			<div class='font-bold text-7xl'>{number}</div>
			<div class='flex-grow pl-6'>
				<p class='leading-relaxed text-base'>{body}</p>
			</div>
		</div>
	)
})
