import { component$ } from '@builder.io/qwik'

interface ClickableItemProps {
	text: string
	href: string
	color: string
}

export default component$<ClickableItemProps>(({ text, href, color }) => {
	return (
		<a class=' rounded-lg bg-[#083446] h-[9rem] text-white p-4 ' href={href}>
			<div class='grid grid-cols-3 items-end h-full'>
				<p class='font-bold text-xl col-span-2'>{text}</p>
				<div class='i-mdi-chevron-right-circle-outline h-6 w-6 place-self-end' />
			</div>
			{color}
		</a>
	)
})
