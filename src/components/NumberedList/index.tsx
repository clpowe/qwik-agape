import { component$, useStylesScoped$ } from '@builder.io/qwik'

import styles from './NumberedList.css?inline'

type Item = {
	item: string
}

interface ListProps {
	listItems: Item[]
}

export default component$<ListProps>(({ listItems }) => {
	useStylesScoped$(styles)

	return (
		<ol class='custom-counter'>
			{listItems.map((item) => {
				return <li key={item.item}>{item.item}</li>
			})}
		</ol>
	)
})
