import { component$, useSignal } from '@builder.io/qwik'
import { routeAction$, zod$, z, Form, server$ } from '@builder.io/qwik-city'
import { Input } from '~/components/Input'
import { TextArea } from '~/components/TextArea'
import { SingleSelect } from '~/components/SingleSelect'
import Airtable from 'airtable'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
	'https://nfsivlvxfmhroorykvak.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mc2l2bHZ4Zm1ocm9vcnlrdmFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIyNDE2OTEsImV4cCI6MjAwNzgxNzY5MX0.gZvp2zjL59KQcDjPCwPpmJtJ2zJz55r91H8dF9g-J4M'
)

const base = new Airtable({
	apiKey:
		'patZ1YogJ4orw2mS9.9ba71b814341bb9fc1939b207bedd33e36485a018c20b49352f6a79f88476f3c'
}).base('appRaAlKfaCArFizD')

const upload = server$(async (files: any) => {
	try {
		const uploadPromises = files.map(async (file: any) => {
			const { data, error } = await supabase.storage
				.from('Agape')
				.upload(file.name, file)

			if (error) {
				console.error(error)
				throw error
			}

			const path = data?.path

			const item = {
				url: `https://nfsivlvxfmhroorykvak.supabase.co/storage/v1/object/public/Agape/${path}`
			}

			return item
		})

		return Promise.all(uploadPromises)
	} catch (error) {
		console.error(error)
		throw error
	}
})

export const useApplication = routeAction$(
	async (data, event) => {
		try {
			const formData = await event.request.formData()
			const files = formData.getAll('fldwtQtKsdcrDpayg')

			const transcript: any[] = await upload(files)

			const createdRecords = await createAirtableRecords(data, transcript)

			return {
				success: true
			}
		} catch (error) {
			console.error(error)
			return {
				success: false,
				error: 'An error occurred while adding the user.'
			}
		}
	},
	zod$({
		fldimJcyXXIeXfzyX: z.string(),
		fldVYudWzqKR5odLo: z.string(),
		fldrtWiz5sX3eckqr: z.string().email('Invalid email address'),
		fldxaoND1oHtMUvAn: z.string().refine((value) => {
			const phoneNumberRegex = /^\d{10}$/
			return phoneNumberRegex.test(value)
		}, 'Invalid phone number'),
		fldBa0zLdwOtgXaAb: z.enum(['Email', 'Phone', 'Text']),
		fldpV190z6nThgrQx: z.enum(['Married', 'Single', 'Other']),
		fldwtQtKsdcrDpayg: z.any()
	})
)

const createAirtableRecords = server$(
	async (data: any, transcript: any[]): Promise<any> => {
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
							fldwtQtKsdcrDpayg: transcript
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
	}
)

export default component$(() => {
	const action = useApplication()

	return (
		<Form action={action}>
			<div class='space-y-12'>
				<div class='border-b border-gray-900/10 pb-12'>
					<Input
						name='fldimJcyXXIeXfzyX'
						id='fldimJcyXXIeXfzyX'
						placeholder='Full Name'
						type='text'
						label='Name'
					/>
					<Input
						name='fldVYudWzqKR5odLo'
						placeholder='Last Name'
						id='fldVYudWzqKR5odLo'
						type='text'
						label='2. What is your mailing address?'
					/>
					<Input
						name='fldrtWiz5sX3eckqr'
						placeholder='email@address.com'
						id='fldrtWiz5sX3eckqr'
						type='email'
						label='3. What is your preferred email address?'
					/>
					<Input
						name='fldxaoND1oHtMUvAn'
						placeholder='(111) 123-4567'
						id='fldxaoND1oHtMUvAn'
						type='tel'
						label='4. What is your cell phone number?'
					/>

					{/* <div>
						<label
							for='fldBa0zLdwOtgXaAb'
							class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							5. What is your preferred method of communication?
						</label>
						<select
							id='fldBa0zLdwOtgXaAb'
							class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
							name='fldBa0zLdwOtgXaAb'
						>
							<option value='Email'>Email</option>
							<option value='Phone'>Phone</option>
							<option value='Text'>Text</option>
						</select>
					</div> */}

					<SingleSelect
						id='fldBa0zLdwOtgXaAb'
						value='Text'
						name='fldBa0zLdwOtgXaAb'
						label='5. What is your preferred method of communication?'
						options={['Email', 'Phone', 'Text']}
					/>
					<SingleSelect
						id='fldpV190z6nThgrQx'
						value='Other'
						name='fldpV190z6nThgrQx'
						label='6. What is your marital status?'
						options={['Married', 'Single', 'Other']}
					/>

					<input
						type='file'
						multiple
						name='fldwtQtKsdcrDpayg'
						id='fldwtQtKsdcrDpayg'
					/>

					{action.value?.failed && (
						<p>{action.value.fieldErrors?.fldimJcyXXIeXfzyX}</p>
					)}
					<button type='submit'>Submit</button>
				</div>
			</div>
		</Form>
	)
})
