import { component$ } from '@builder.io/qwik'

interface BodyProps {
	text: string
}

export default component$<BodyProps>(({ text }) => {
	return (
		<>
			<p class='text-base text-gray-500 max-w-[75ch]'>{text}</p>
		</>
	)
})
