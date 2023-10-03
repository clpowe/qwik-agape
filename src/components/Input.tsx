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
			<div class='field'>
				<label for={name} class='label has-text-weight-normal'>
					{label}
				</label>
				<input
					aria-invalid={error}
					type={type}
					name={name}
					id={id}
					class={['input is-medium', error && errorMsg ? 'is-danger' : '']}
					placeholder={placeholder}
					required={required}
				/>
				{error && <p class='help is-danger'>{errorMsg}</p>}
			</div>
		)
	}
)
