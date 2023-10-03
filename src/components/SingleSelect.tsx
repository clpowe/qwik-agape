import { component$ } from '@builder.io/qwik'

type InputProps = {
	name: string
	label: string
	options: string[]
	id: string
	value?: string | undefined
	multiple?: boolean
	error: boolean | undefined
	errorMsg?: string[]
}

export const SingleSelect = component$<InputProps>(
	({ name, label, id, options, multiple, error, errorMsg }) => {
		return (
			<div class='field'>
				<label for={name} class='label has-text-weight-normal'>
					{label}
				</label>
				<div class='control'>
					<div class='select'>
						<select name={name} id={id} multiple={multiple}>
							{options.map((option) => (
								<option value={option} key={option}>
									{option}
								</option>
							))}
						</select>
					</div>
				</div>
				{error && <p class='help is-danger'>{errorMsg}</p>}
			</div>
		)
	}
)
