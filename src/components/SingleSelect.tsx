import { component$ } from '@builder.io/qwik'

type InputProps = {
	name: string
	label: string
	options: string[]
	id: string
	value?: string | undefined
	multiple?: boolean
}

export const SingleSelect = component$<InputProps>(
	({ name, label, id, options, multiple }) => {
		return (
			<div>
				<label
					for={name}
					class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
				>
					{label}
				</label>
				<select
					name={name}
					id={id}
					multiple={multiple}
					class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
				>
					{options.map((option) => (
						<option value={option} key={option}>
							{option}
						</option>
					))}
				</select>
			</div>
		)
	}
)
