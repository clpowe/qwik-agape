import { component$ } from '@builder.io/qwik'

type InputProps = {
	name: string
	label: string
	placeholder: string
	required?: boolean
	value?: any
	id: string
	error: boolean | undefined
	errorMsg?: string[]
}

export const TextArea = component$<InputProps>(
	({ name, label, placeholder, required, id, error, errorMsg }) => {
		return (
			<div class='col-span-2'>
				<label
					for={name}
					class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
				>
					{label}
				</label>
				<textarea
					name={name}
					id={id}
					class='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
					placeholder={placeholder}
					required={required}
				/>
				{error && <p class='text-red-700 '>{errorMsg}</p>}
			</div>
		)
	}
)
