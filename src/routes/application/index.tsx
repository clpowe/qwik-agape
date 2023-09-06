import { component$ } from '@builder.io/qwik'
import { routeAction$, zod$, z, Form, server$ } from '@builder.io/qwik-city'
import { Input } from '~/components/Input'
import { TextArea } from '~/components/TextArea'
import { SingleSelect } from '~/components/SingleSelect'
import Airtable from 'airtable'
import { createClient } from '@supabase/supabase-js'
import InnerHero from '~/components/InnerHero'

const supabase = createClient(
	'https://nfsivlvxfmhroorykvak.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mc2l2bHZ4Zm1ocm9vcnlrdmFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIyNDE2OTEsImV4cCI6MjAwNzgxNzY5MX0.gZvp2zjL59KQcDjPCwPpmJtJ2zJz55r91H8dF9g-J4M'
)

const base = new Airtable({
	apiKey:
		'patZ1YogJ4orw2mS9.9ba71b814341bb9fc1939b207bedd33e36485a018c20b49352f6a79f88476f3c'
}).base('appRaAlKfaCArFizD')

const upload = server$(async (files: any) => {
	const uuid = crypto.randomUUID()
	try {
		const uploadPromises = files.map(async (file: any) => {
			const { data, error } = await supabase.storage
				.from('Agape')
				.upload(`${uuid}-${file.name}`, file)

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
			const multi = formData.getAll('fldSStHTLPOU0iAue')
			const examFiles = formData.getAll('fldN3exD7NwCBe027')

			const transcript: any[] = await upload(files)
			const exam: any[] = await upload(examFiles)

			await createAirtableRecords(data, multi, transcript, exam)

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

const createAirtableRecords = server$(
	async (
		data: any,
		multi: any,
		transcript: any[],
		exam: any[]
	): Promise<any> => {
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
							fldSStHTLPOU0iAue: [...multi],
							fldtVzOLU0KSghmXB: data.fldtVzOLU0KSghmXB,
							fldpVdxYmvK2n0VSI: data.fldpVdxYmvK2n0VSI,
							fldwtQtKsdcrDpayg: transcript,
							fldv4ACVh4FwvmDjb: data.fldv4ACVh4FwvmDjb,
							fldJ77eZV0TLfPIbF: data.fldJ77eZV0TLfPIbF,
							flddDj1OxXaYhRQUh: data.flddDj1OxXaYhRQUh,
							fldAujUZg5GIjjqyI: data.fldAujUZg5GIjjqyI,
							fld9Rn5z86f80SboE: data.fld9Rn5z86f80SboE,
							fldvamj9FEmc8KJjx: data.fldvamj9FEmc8KJjx,
							fldniAel6KEEGzhSS: Number(data.fldniAel6KEEGzhSS),
							fldoLemgII1SEt7am: data.fldoLemgII1SEt7am,
							fld7Un3wB2HQAjw4k: data.fld7Un3wB2HQAjw4k,
							fldN3exD7NwCBe027: exam
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
		<>
			<InnerHero headline='Application' />
			<Form action={action}>
				<div class='space-y-12 max-w-[60ch] mx-auto'>
					<div class='border-b border-gray-900/10 pb-12'>
						<Input
							name='fldimJcyXXIeXfzyX'
							id='fldimJcyXXIeXfzyX'
							placeholder='Full Name'
							type='text'
							label='Name'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldimJcyXXIeXfzyX}
						/>
						<Input
							name='fldVYudWzqKR5odLo'
							placeholder='mailing address'
							id='fldVYudWzqKR5odLo'
							type='text'
							label='2. What is your mailing address?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldVYudWzqKR5odLo}
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
						<TextArea
							id='fld16nTUwI0ltg2Im'
							name='fld16nTUwI0ltg2Im'
							label='7. How many children do you have and what are their ages?'
							placeholder=''
						/>
						<TextArea
							id='fldVOWwstEB17l7Ru'
							name='fldVOWwstEB17l7Ru'
							label='8. Do you have any other obligations that could potentially take away from your study time, such as caring for a sick family member, planned trips, etc.? If so, please explain.'
							placeholder=''
						/>
						<SingleSelect
							id='fldDxpFGkotOrE9jW'
							value='Other'
							name='fldDxpFGkotOrE9jW'
							label='9. What is your t-shirt size?'
							options={['XS', 'S', 'M', 'L', 'XL', '2X', '3X', '4X']}
						/>
						<TextArea
							id='fldEA9ECo9vHykhVZ'
							name='fldEA9ECo9vHykhVZ'
							label='10. How did you hear about Agape Christian Bar Prep?'
							placeholder=''
						/>
						<TextArea
							id='fldmG8b69avNhjnPW'
							name='fldmG8b69avNhjnPW'
							label='11. Who can we thank for referring you?'
							placeholder=''
						/>

						<Input
							name='fldXrwRXkUX3y9pHR'
							placeholder=''
							id='fldXrwRXkUX3y9pHR'
							type='text'
							label='12. What law school did you attend or what law school are you attending?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldXrwRXkUX3y9pHR}
						/>
						<Input
							name='fldIT9AUQfexLNpyU'
							placeholder=''
							id='fldIT9AUQfexLNpyU'
							type='text'
							label='13. What year did you graduate law school or when will you graduate law school?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldIT9AUQfexLNpyU}
						/>
						<Input
							name='fldOyCIoZJJdVDgbh'
							placeholder=''
							id='fldOyCIoZJJdVDgbh'
							type='text'
							label='14. What is your law school cumulative GPA?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldOyCIoZJJdVDgbh}
						/>

						<label
							for='fldwtQtKsdcrDpayg'
							class={[
								'block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
							]}
						>
							<span>
								15. Please upload a copy of your law school transcript.
							</span>
							<input
								type='file'
								multiple
								name='fldwtQtKsdcrDpayg'
								id='fldwtQtKsdcrDpayg'
							/>
							{action.value?.failed && (
								<p>{action.value?.fieldErrors?.fldwtQtKsdcrDpayg}</p>
							)}
						</label>

						<Input
							name='fldoOhpWPW0gs2yMX'
							placeholder=''
							id='fldoOhpWPW0gs2yMX'
							type='number'
							label='16. What was your LSAT score?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldoOhpWPW0gs2yMX}
						/>

						<Input
							name='fldRAg0746GAu8PVC'
							placeholder=''
							id='fldRAg0746GAu8PVC'
							type='text'
							label='17. What college did you attend for undergraduate and, if applicable, graduate school?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldRAg0746GAu8PVC}
						/>
						<Input
							name='fld9TArJ7BN7lZFYk'
							placeholder=''
							id='fld9TArJ7BN7lZFYk'
							type='text'
							label='18. What was your major in college and, if applicable, graduate school?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fld9TArJ7BN7lZFYk}
						/>
						<Input
							name='fldlLFKIGiw8La2xZ'
							placeholder=''
							id='fldlLFKIGiw8La2xZ'
							type='text'
							label='19. What was your undergraduate cumulative GPA and, if applicable, graduate school?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldlLFKIGiw8La2xZ}
						/>
						<SingleSelect
							id='fldSStHTLPOU0iAue'
							name='fldSStHTLPOU0iAue'
							label='20. Which tutoring program or writing course interest you?'
							multiple={true}
							options={[
								'Bar Prep 101',
								'Bar Prep 101 Plus',
								'Essay Writing Boot Camp',
								'MPT Writing Clinic',
								'Uniform Bar Exam Writing Clinic',
								'Essay Writing Crash Course',
								'Bar Prep Academy',
								'MBE 101',
								'MBE 101 Plus',
								'JumpStart'
							]}
						/>
						<Input
							name='fldtVzOLU0KSghmXB'
							placeholder=''
							id='fldtVzOLU0KSghmXB'
							type='text'
							label='21. Are you currently a licensed attorney in any state? If so, which state(s)?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldtVzOLU0KSghmXB}
						/>
						<Input
							name='fldv4ACVh4FwvmDjb'
							placeholder=''
							id='fldv4ACVh4FwvmDjb'
							type='text'
							label='23. Will you be working while studying for the bar exam? If yes, please list your regular working hours.'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldv4ACVh4FwvmDjb}
						/>
						<SingleSelect
							id='fldpVdxYmvK2n0VSI'
							name='fldpVdxYmvK2n0VSI'
							label='24. If you will be working while studying for the bar exam, are you able to take the last two full weeks before the bar exam off from work?'
							options={['yes', 'no', 'maybe']}
						/>
						<Input
							name='fldJ77eZV0TLfPIbF'
							placeholder='morning, afternoon or evening'
							id='fldJ77eZV0TLfPIbF'
							type='text'
							label='25. How many hours can you commit per week to studying for the bar exam?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldJ77eZV0TLfPIbF}
						/>
						<Input
							name='flddDj1OxXaYhRQUh'
							placeholder='morning, afternoon or evening'
							id='flddDj1OxXaYhRQUh'
							type='text'
							label='26. What time of day do you best study (i.e., morning, afternoon or evening)?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.flddDj1OxXaYhRQUh}
						/>
						<Input
							name='fldAujUZg5GIjjqyI'
							placeholder='morning, afternoon or evening'
							id='fldAujUZg5GIjjqyI'
							type='text'
							label='28. Are you planning to take the MPRE while preparing for the bar exam? If yes, please provide the date of the MPRE exam you plan to take.'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldAujUZg5GIjjqyI}
						/>
						<TextArea
							id='fld9Rn5z86f80SboE'
							name='fld9Rn5z86f80SboE'
							label='29. Have you been granted testing accommodations for the bar exam? If so, please state the testing accommodations you have received.'
							placeholder=''
						/>
						<Input
							name='fldvamj9FEmc8KJjx'
							placeholder='morning, afternoon or evening'
							id='fldvamj9FEmc8KJjx'
							type='text'
							label='30. Have you been granted (or did you receive) testing accommodations for law school exams? If so, please state the testing accommodations you have been granted or received.'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldvamj9FEmc8KJjx}
						/>
						<Input
							name='fldniAel6KEEGzhSS'
							placeholder=''
							id='fldniAel6KEEGzhSS'
							type='number'
							label='31. If applicable, please state the specific number of times you have taken the bar exam unsuccessfully.'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldniAel6KEEGzhSS}
						/>
						<TextArea
							id='fldoLemgII1SEt7am'
							name='fldoLemgII1SEt7am'
							label='32. If applicable, why do you believe you were unsuccessful when taking the bar exam in the past?'
							placeholder=''
						/>
						<TextArea
							id='fld7Un3wB2HQAjw4k'
							name='fld7Un3wB2HQAjw4k'
							label='33. Why do you want to work with Agape Christian Bar Prep?'
							placeholder=''
						/>
						<label
							for='fldN3exD7NwCBe027'
							class={[
								'block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
							]}
						>
							<span>
								34. If you have taken the bar exam before, please upload copies
								of ALL past score reports.
							</span>
							<input
								type='file'
								multiple
								name='fldN3exD7NwCBe027'
								id='fldN3exD7NwCBe027'
							/>
							{action.value?.failed && (
								<p>{action.value?.fieldErrors?.fldN3exD7NwCBe027}</p>
							)}
						</label>
						{action.value?.failed && <p>{}</p>}
						<button type='submit'>Submit</button>
					</div>
				</div>
			</Form>
		</>
	)
})
