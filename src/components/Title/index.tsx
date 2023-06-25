import { component$ } from '@builder.io/qwik'

interface TitleProps {
	title: string
	titleSecondary: string
}

export default component$<TitleProps>(({ title, titleSecondary }) => {
	return (
		<>
			<h2 class='text-4xl font-bold max-w-[10ch]'>
				{title} <span class='text-red-700'>{titleSecondary}</span>
			</h2>
		</>
	)
})
