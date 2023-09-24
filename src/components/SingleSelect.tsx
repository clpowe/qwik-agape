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
			<div>
				<label for={name}>{label}</label>
				<select name={name} id={id} multiple={multiple}>
					{options.map((option) => (
						<option value={option} key={option}>
							{option}
						</option>
					))}
				</select>
				{error && <p class='text-red-700 '>{errorMsg}</p>}
			</div>
		)
	}
)
