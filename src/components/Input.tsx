import { component$ } from '@builder.io/qwik'

type InputProps = {
	name: string
	label: string
	placeholder: string
	type: string
	required?: boolean
	value?: any
	id: string
	error: boolean | undefined
	errorMsg?: string[]
}

export const Input = component$<InputProps>(
	({ name, label, placeholder, type, required, id, error, errorMsg }) => {
		return (
			<>
				<div>
					<label
						for={name}
						class={[
							'block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
						]}
					>
						{label}
					</label>
					<input
						type={type}
						name={name}
						id={id}
						class={[
							'shadow-sm bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light',
							error && errorMsg ? 'border-red-700' : 'border-gray-300'
						]}
						placeholder={placeholder}
						required={required}
					/>
				</div>
				{error && <p class='text-red-700 '>{errorMsg}</p>}
			</>
		)
	}
)
