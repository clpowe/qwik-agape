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
			<>
				<label for={name}>
					{label}

					<textarea
						name={name}
						id={id}
						placeholder={placeholder}
						required={required}
					/>
				</label>
				{error && <p class='text-red-700 '>{errorMsg}</p>}
			</>
		)
	}
)
