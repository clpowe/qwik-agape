import { component$ } from '@builder.io/qwik'
import { routeAction$, zod$, z, Form, server$ } from '@builder.io/qwik-city'
import { Input } from '~/components/Input'
import { TextArea } from '~/components/TextArea'
import Airtable from 'airtable'
import InnerHero from '~/components/InnerHero'

const base = new Airtable({
	apiKey:
		'patZ1YogJ4orw2mS9.9ba71b814341bb9fc1939b207bedd33e36485a018c20b49352f6a79f88476f3c'
}).base('appRaAlKfaCArFizD')

export const useApplication = routeAction$(
	async (data) => {
		try {
			await createAirtableRecords(data)

			return {
				success: true
			}
		} catch (error) {
			console.error(error)
			return {
				success: false,
				error: 'An error occurred while uploading your application.'
			}
		}
	},
	zod$({
		fldimJcyXXIeXfzyX: z.string().nonempty('You must provide your full name'),
		fldVYudWzqKR5odLo: z.string(),
		fldrtWiz5sX3eckqr: z
			.string()
			.email('Invalid email address')
			.nonempty('You must provide a valid emal'),
		fldxaoND1oHtMUvAn: z.string().refine((value) => {
			const phoneNumberRegex = /^\d{10}$/
			return phoneNumberRegex.test(value)
		}, 'Invalid phone number'),
		fldBa0zLdwOtgXaAb: z.enum(['Email', 'Phone', 'Text']),
		fldpV190z6nThgrQx: z.enum(['Married', 'Single', 'Other']),
		fld16nTUwI0ltg2Im: z.string(),
		fldVOWwstEB17l7Ru: z.string(),
		fldDxpFGkotOrE9jW: z.enum(['XS', 'S', 'M', 'L', 'XL', '2X', '3X', '4X']),
		fldEA9ECo9vHykhVZ: z.string(),
		fldmG8b69avNhjnPW: z.string(),
		fldXrwRXkUX3y9pHR: z.string(),
		fldIT9AUQfexLNpyU: z.string(),
		fldOyCIoZJJdVDgbh: z.string(),
		fldoOhpWPW0gs2yMX: z.string(),
		fldRAg0746GAu8PVC: z.string(),
		fld9TArJ7BN7lZFYk: z.string(),
		fldlLFKIGiw8La2xZ: z.string(),
		fldSStHTLPOU0iAue: z.any(),
		fldtVzOLU0KSghmXB: z.string(),
		fldwtQtKsdcrDpayg: z.any(),
		fldpVdxYmvK2n0VSI: z.enum(['yes', 'no', 'maybe']),
		fldv4ACVh4FwvmDjb: z.string(),
		fldJ77eZV0TLfPIbF: z.string(),
		flddDj1OxXaYhRQUh: z.string(),
		fldAujUZg5GIjjqyI: z.string(),
		fld9Rn5z86f80SboE: z.string(),
		fldvamj9FEmc8KJjx: z.string(),
		fldniAel6KEEGzhSS: z.string(),
		fldoLemgII1SEt7am: z.string(),
		fld7Un3wB2HQAjw4k: z.string(),
		fldN3exD7NwCBe027: z.any()
	})
)

const createAirtableRecords = server$(async (data: any): Promise<any> => {
	return new Promise((resolve, reject) => {
		base('Test').create(
			[
				{
					fields: {
						Name: data.fldimJcyXXIeXfzyX,
						fldVYudWzqKR5odLo: data.fldVYudWzqKR5odLo,
						fldrtWiz5sX3eckqr: data.fldrtWiz5sX3eckqr,
						fldxaoND1oHtMUvAn: data.fldxaoND1oHtMUvAn,
						fldBa0zLdwOtgXaAb: data.fldBa0zLdwOtgXaAb,
						fldpV190z6nThgrQx: data.fldpV190z6nThgrQx,
						fld16nTUwI0ltg2Im: data.fld16nTUwI0ltg2Im,
						fldVOWwstEB17l7Ru: data.fld16nTUwI0ltg2Im,
						fldDxpFGkotOrE9jW: data.fldDxpFGkotOrE9jW,
						fldEA9ECo9vHykhVZ: data.fldEA9ECo9vHykhVZ,
						fldmG8b69avNhjnPW: data.fldmG8b69avNhjnPW,
						fldXrwRXkUX3y9pHR: data.fldXrwRXkUX3y9pHR,
						fldIT9AUQfexLNpyU: data.fldIT9AUQfexLNpyU,
						fldOyCIoZJJdVDgbh: data.fldOyCIoZJJdVDgbh,
						fldoOhpWPW0gs2yMX: Number(data.fldoOhpWPW0gs2yMX),
						fldRAg0746GAu8PVC: data.fldRAg0746GAu8PVC,
						fld9TArJ7BN7lZFYk: data.fld9TArJ7BN7lZFYk,
						fldlLFKIGiw8La2xZ: data.fldlLFKIGiw8La2xZ,

						fldtVzOLU0KSghmXB: data.fldtVzOLU0KSghmXB,
						fldpVdxYmvK2n0VSI: data.fldpVdxYmvK2n0VSI,

						fldv4ACVh4FwvmDjb: data.fldv4ACVh4FwvmDjb,
						fldJ77eZV0TLfPIbF: data.fldJ77eZV0TLfPIbF,
						flddDj1OxXaYhRQUh: data.flddDj1OxXaYhRQUh,
						fldAujUZg5GIjjqyI: data.fldAujUZg5GIjjqyI,
						fld9Rn5z86f80SboE: data.fld9Rn5z86f80SboE,
						fldvamj9FEmc8KJjx: data.fldvamj9FEmc8KJjx,
						fldniAel6KEEGzhSS: Number(data.fldniAel6KEEGzhSS),
						fldoLemgII1SEt7am: data.fldoLemgII1SEt7am,
						fld7Un3wB2HQAjw4k: data.fld7Un3wB2HQAjw4k
					}
				}
			],
			function (err: any, records: any) {
				if (err) {
					console.error(err)
					reject(err)
					return
				}
				records.forEach(function (record: any) {
					console.log(record.getId())
				})
				resolve(records)
			}
		)
	})
})

export default component$(() => {
	const action = useApplication()

	return (
		<>
			<InnerHero headline='Contact Agape' />
			<div class='isolate bg-white px-6 py-24 sm:py-32 lg:px-8 max-w-[100ch] mx-auto'>
				<Form action={action}>
					<div class='grid gap-4'>
						<Input
							name='fldimJcyXXIeXfzyX'
							id='fldimJcyXXIeXfzyX'
							placeholder='First name'
							type='text'
							label='First name'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldimJcyXXIeXfzyX}
						/>
						<Input
							name='fldimJcyXXIeXfzyX'
							id='fldimJcyXXIeXfzyX'
							placeholder='Last name'
							type='text'
							label='Last name'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldimJcyXXIeXfzyX}
						/>

						<Input
							name='fldrtWiz5sX3eckqr'
							placeholder='email@address.com'
							id='fldrtWiz5sX3eckqr'
							type='email'
							label='3. What is your preferred email address?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldrtWiz5sX3eckqr}
						/>

						<Input
							name='fldxaoND1oHtMUvAn'
							placeholder='(111) 123-4567'
							id='fldxaoND1oHtMUvAn'
							type='tel'
							label='4. What is your cell phone number?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldxaoND1oHtMUvAn}
						/>

						<TextArea
							id='fld16nTUwI0ltg2Im'
							name='fld16nTUwI0ltg2Im'
							label='Message'
							placeholder=''
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fld16nTUwI0ltg2Im}
						/>
					</div>
					<div class='mt-10'>
						<button
							type='submit'
							class='block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Let's talk
						</button>
					</div>
				</Form>
			</div>
		</>
	)
})
