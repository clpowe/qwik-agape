import { component$ } from '@builder.io/qwik'

interface TitleProps {
	title: string
	eyebrow?: string
	titleSecondary: string
}

export default component$<TitleProps>(({ title, titleSecondary, eyebrow }) => {
	return (
		<div>
			<p class='uppercase'>{eyebrow}</p>
			<h2 class='text-4xl font-bold max-w-[20ch] break-normal'>
				{title} <span class='text-[var(--primary)]'>{titleSecondary}</span>
			</h2>
		</div>
	)
})
