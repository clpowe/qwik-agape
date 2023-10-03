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
			<div class='field'>
				<label for={name} class='label has-text-weight-normal'>
					{label}
				</label>
				<div class='control'>
					<textarea
						name={name}
						id={id}
						placeholder={placeholder}
						required={required}
						class='textarea'
					/>
				</div>
				{error && <p class='help is-danger'>{errorMsg}</p>}
			</div>
		)
	}
)
