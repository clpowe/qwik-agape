import { component$ } from '@builder.io/qwik'

interface ClickableItemProps {
	text: string
	href: string
	color: string
}

export default component$<ClickableItemProps>(({ text, href, color }) => {
	return (
		<a
			class='min-w-[10rem] rounded-lg bg-[#083446] h-[9rem] text-white p-4'
			href={href}
		>
			<div class='flex items-end h-full'>
				<p class='font-bold text-xl '>{text}</p>
				<div class='i-mdi-chevron-right-circle-outline h-8 w-8' />
			</div>
			{color}
		</a>
	)
})
