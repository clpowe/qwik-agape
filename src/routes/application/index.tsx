import { component$ } from '@builder.io/qwik'
import { routeAction$, zod$, z, Form, server$ } from '@builder.io/qwik-city'
import { Input } from '~/components/Input'
import { TextArea } from '~/components/TextArea'
import { SingleSelect } from '~/components/SingleSelect'
import Airtable from 'airtable'
import { createClient } from '@supabase/supabase-js'
import InnerHero from '~/components/InnerHero'

export const upload = server$(async function (files: any) {
	console.log(this)
	const key: string = process.env.SUPABASE_KEY ?? ''
	const supabase = createClient('https://nfsivlvxfmhroorykvak.supabase.co', key)

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
			const files = formData.getAll('fldSDIUUUVNWzTna5')
			const multi = formData.getAll('fld6uCkntQuX0OPoV')

			const examFiles = formData.getAll('fldTCYazP1i6TpN54')

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
		fldmUMmM19iZP1Grl: z.string().nonempty('You must provide your full name'),
		fldOQfftgNjsXkh8C: z.string(),
		fld9abj3oizoYB7rO: z
			.string()
			.email('Invalid email address')
			.nonempty('You must provide a valid emal'),
		fldxaoND1oHtMUvAn: z.string().refine((value) => {
			const phoneNumberRegex = /^\d{10}$/
			return phoneNumberRegex.test(value)
		}, 'Invalid phone number'),
		fld5ZX8iAVQIJMj9b: z.enum(['Email', 'Phone', 'Text']),
		fldGVrfDJEtejqOVD: z.enum(['Married', 'Single']),
		fldhVTcDckSIJG5ug: z.string(),
		fld9VbSKIRidEJQtz: z.string(),
		fldAJIJwnPZLWlSl3: z.enum(['XS', 'S', 'M', 'L', 'XL', '2X', '3X', '4X']),
		fldAvNG7K7AiWXoue: z.string(),
		fldEPmkZx3EhCQHi4: z.string(),
		fld4Y9JvzWEJ0JgpZ: z.string(),
		fldkjGgnBk3V8aEJc: z.string(),
		fldSDIUUUVNWzTna5: z.any(),
		fldQ5zNuZS8Ykq06F: z.string(),
		fldVaYJs7V4blF6Fd: z.string(),
		fldRvz9cFeSPlz6Nu: z.string(),
		fldJ8NOtmEPLfwxGp: z.string(),
		fld6uCkntQuX0OPoV: z.any(),
		fldkMTWKErNuBU6T8: z.string(),
		fldm8afesvLYLneJa: z.string(),
		fldAfq9tmJSkQoWY9: z.string(),
		fldUU0VpDYTbzWtsd: z.any(),
		fldDnKFFvAZvbVUVN: z.string(),
		fldTCYazP1i6TpN54: z.any(),
		flddOp9eQeMLTBw9A: z.string(),
		fldnhtaVTa1Pxjbw7: z.string(),
		fldJwU5Gp6Y05nISw: z.string(),
		fldmI1JEq3tF59v5o: z.string(),
		fldJAAoxLmmQUUKXb: z.string(),
		fld14n4doLdMujJr4: z.string(),
		fldcEvDnx7yDXGtaH: z.string(),
		fldwOFwQjp9mmzeCA: z.string(),
		fldwJNJx8XuL9CH3o: z.string(),
		fld2LbhLsphcZ1NM3: z.enum([
			'Tuesday, September 26, 2023 @ 7 p.m. EST',
			'Thursday, September 28, 2023 @ 7 p.m. EST',
			'Monday, October 2, 2023 @ 7 p.m. EST',
			'Wednesday, October 4, 2023 @ 7 p.m. EST',
			'Saturday, October 7, 2023 @ 10 a.m. EST'
		])
	})
)

export const createAirtableRecords = server$(async function (
	data: any,
	multi: any,

	transcript: any[],
	exam: any[]
): Promise<any> {
	const key: string = process.env.AIRTABLE_KEY ?? ''

	const base = new Airtable({
		apiKey: key
	}).base('app4lid64f6dCji7W')
	return new Promise((resolve, reject) => {
		base('Table 1').create(
			[
				{
					fields: {
						fldmUMmM19iZP1Grl: data.fldmUMmM19iZP1Grl,
						fldOQfftgNjsXkh8C: data.fldOQfftgNjsXkh8C,
						fld9abj3oizoYB7rO: data.fld9abj3oizoYB7rO,
						fldTu91RST993Gdrw: data.fldTu91RST993Gdrw,
						fld5ZX8iAVQIJMj9b: data.fld5ZX8iAVQIJMj9b,
						fldGVrfDJEtejqOVD: data.fldGVrfDJEtejqOVD,
						fldhVTcDckSIJG5ug: data.fldhVTcDckSIJG5ug,
						fld9VbSKIRidEJQtz: data.fld9VbSKIRidEJQtz,
						fldAJIJwnPZLWlSl3: data.fldAJIJwnPZLWlSl3,
						fldAvNG7K7AiWXoue: data.fldAvNG7K7AiWXoue,
						fldEPmkZx3EhCQHi4: data.fldEPmkZx3EhCQHi4,
						fld4Y9JvzWEJ0JgpZ: data.fld4Y9JvzWEJ0JgpZ,
						fldkjGgnBk3V8aEJc: data.fldkjGgnBk3V8aEJc,
						fldSDIUUUVNWzTna5: transcript,
						fldQ5zNuZS8Ykq06F: Number(data.fldQ5zNuZS8Ykq06F),
						fldVaYJs7V4blF6Fd: data.fldVaYJs7V4blF6Fd,
						fldRvz9cFeSPlz6Nu: data.fldRvz9cFeSPlz6Nu,
						fldJ8NOtmEPLfwxGp: data.fldJ8NOtmEPLfwxGp,
						fld6uCkntQuX0OPoV: [...multi],
						fldkMTWKErNuBU6T8: data.fldkMTWKErNuBU6T8,
						fldm8afesvLYLneJa: data.fldm8afesvLYLneJa,
						fldAfq9tmJSkQoWY9: data.fldAfq9tmJSkQoWY9,
						fldUU0VpDYTbzWtsd: Number(data.fldUU0VpDYTbzWtsd),
						fldDnKFFvAZvbVUVN: data.fldDnKFFvAZvbVUVN,
						fldTCYazP1i6TpN54: exam,
						flddOp9eQeMLTBw9A: data.flddOp9eQeMLTBw9A,
						fldnhtaVTa1Pxjbw7: data.fldnhtaVTa1Pxjbw7,
						fldJwU5Gp6Y05nISw: data.fldJwU5Gp6Y05nISw,
						fldmI1JEq3tF59v5o: data.fldmI1JEq3tF59v5o,
						fldJAAoxLmmQUUKXb: data.fldJAAoxLmmQUUKXb,
						fld14n4doLdMujJr4: data.fld14n4doLdMujJr4,
						fldcEvDnx7yDXGtaH: data.fldcEvDnx7yDXGtaH,
						fldwOFwQjp9mmzeCA: data.fldwOFwQjp9mmzeCA,
						fldwJNJx8XuL9CH3o: data.fldwJNJx8XuL9CH3o,
						fld2LbhLsphcZ1NM3: data.fld2LbhLsphcZ1NM3
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
					return record
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
			<InnerHero headline='Application' />
			<Form action={action}>
				<div class=' max-w-[75ch] mx-auto p-4'>
					{/* Personal Information */}
					<section class='section  space-y-8'>
						<h2 class='is-size-3 has-text-weight-semibold'>
							Personal Information
						</h2>
						<Input
							name='fldmUMmM19iZP1Grl'
							id='fldmUMmM19iZP1Grl'
							placeholder='Full Name'
							type='text'
							label='Name'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldmUMmM19iZP1Grl}
						/>

						<Input
							name='fldOQfftgNjsXkh8C'
							placeholder='mailing address'
							id='fldOQfftgNjsXkh8C'
							type='text'
							label='What is your mailing address?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldOQfftgNjsXkh8C}
						/>
						<Input
							name='fld9abj3oizoYB7rO'
							placeholder='email@address.com'
							id='fld9abj3oizoYB7rO'
							type='email'
							label='What is your preferred email address?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fld9abj3oizoYB7rO}
						/>

						<Input
							name='fldxaoND1oHtMUvAn'
							placeholder='(111) 123-4567'
							id='fldxaoND1oHtMUvAn'
							type='tel'
							label='What is your cell phone number?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldxaoND1oHtMUvAn}
						/>
						<SingleSelect
							id='fld5ZX8iAVQIJMj9b'
							value='Text'
							name='fld5ZX8iAVQIJMj9b'
							label='What is your preferred method of communication?'
							options={['Email', 'Phone', 'Text']}
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fld5ZX8iAVQIJMj9b}
						/>

						<SingleSelect
							id='fldGVrfDJEtejqOVD'
							value='Other'
							name='fldGVrfDJEtejqOVD'
							label='What is your marital status?'
							options={['Married', 'Single']}
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldGVrfDJEtejqOVD}
						/>
						<TextArea
							id='fldhVTcDckSIJG5ug'
							name='fldhVTcDckSIJG5ug'
							label='How many children do you have and what are their ages?'
							placeholder=''
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldhVTcDckSIJG5ug}
						/>

						<TextArea
							id='fld9VbSKIRidEJQtz'
							name='fld9VbSKIRidEJQtz'
							label='Do you have any other obligations that could potentially take away from your study time, such as caring for a sick family member, planned trips, etc.? If so, please explain.'
							placeholder=''
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fld9VbSKIRidEJQtz}
						/>

						<SingleSelect
							id='fldAJIJwnPZLWlSl3'
							value='Other'
							name='fldAJIJwnPZLWlSl3'
							label='What is your t-shirt size?'
							options={['XS', 'S', 'M', 'L', 'XL', '2X', '3X', '4X']}
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldAJIJwnPZLWlSl3}
						/>

						<TextArea
							id='fldAvNG7K7AiWXoue'
							name='fldAvNG7K7AiWXoue'
							label='How did you hear about Agape Christian Bar Prep?'
							placeholder=''
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldAvNG7K7AiWXoue}
						/>
					</section>
					{/* School History */}
					<section class=' section  space-y-8'>
						<h2 class='is-size-3 has-text-weight-semibold'>
							Education History
						</h2>
						<Input
							name='fldEPmkZx3EhCQHi4'
							placeholder=''
							id='fldEPmkZx3EhCQHi4'
							type='text'
							label='What law school did you attend or what law school are you attending?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldEPmkZx3EhCQHi4}
						/>

						<div class='p-grid'>
							<Input
								name='fld4Y9JvzWEJ0JgpZ'
								placeholder=''
								id='fld4Y9JvzWEJ0JgpZ'
								type='text'
								label='What year did you graduate law school or when will you graduate law school?'
								error={action.value?.failed}
								errorMsg={action.value?.fieldErrors?.fld4Y9JvzWEJ0JgpZ}
							/>
							<Input
								name='fldkjGgnBk3V8aEJc'
								placeholder=''
								id='fldkjGgnBk3V8aEJc'
								type='text'
								label='What is your law school cumulative GPA?'
								error={action.value?.failed}
								errorMsg={action.value?.fieldErrors?.fldkjGgnBk3V8aEJc}
							/>
						</div>

						<label
							for='fldSDIUUUVNWzTna5'
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
								name='fldSDIUUUVNWzTna5'
								id='fldSDIUUUVNWzTna5'
							/>
							{action.value?.failed && (
								<p>{action.value?.fieldErrors?.fldSDIUUUVNWzTna5}</p>
							)}
						</label>
						<div class='p-grid'>
							<Input
								name='fldQ5zNuZS8Ykq06F'
								placeholder=''
								id='fldQ5zNuZS8Ykq06F'
								type='number'
								label='What was your LSAT score?'
								error={action.value?.failed}
								errorMsg={action.value?.fieldErrors?.fldQ5zNuZS8Ykq06F}
							/>
							<Input
								name='fldVaYJs7V4blF6Fd'
								placeholder=''
								id='fldVaYJs7V4blF6Fd'
								type='text'
								label='What college did you attend for undergraduate and, if applicable, graduate school?'
								error={action.value?.failed}
								errorMsg={action.value?.fieldErrors?.fldVaYJs7V4blF6Fd}
							/>
						</div>
						<div class='p-grid'>
							<Input
								name='fldRvz9cFeSPlz6Nu'
								placeholder=''
								id='fldRvz9cFeSPlz6Nu'
								type='text'
								label='What was your major in college and, if applicable, graduate school?'
								error={action.value?.failed}
								errorMsg={action.value?.fieldErrors?.fldRvz9cFeSPlz6Nu}
							/>

							<Input
								name='fldJ8NOtmEPLfwxGp'
								placeholder=''
								id='fldJ8NOtmEPLfwxGp'
								type='text'
								label='What was your undergraduate cumulative GPA and, if applicable, graduate school?'
								error={action.value?.failed}
								errorMsg={action.value?.fieldErrors?.fldJ8NOtmEPLfwxGp}
							/>
						</div>
					</section>

					{/* General Information */}
					<section class='section space-y-8'>
						<h2 class='is-size-3 has-text-weight-semibold'>
							General Information
						</h2>
						<SingleSelect
							id='fld6uCkntQuX0OPoV'
							name='fld6uCkntQuX0OPoV'
							label='Which course(s) interest you?'
							multiple={true}
							options={[
								'Bar Prep Academy',
								'Bar Prep 101 (First-time takers only)',
								'Bar Prep 101 Plus (Repeat takers only)',
								'Essay Boot Camp (First-time takers only)',
								'Essay Boot Camp Plus (Repeat takers only)',
								'MBE 101 (MBE Only Takers)',
								'MBE Boot Camp',
								'MPT Writing Clinic ',
								'Small Group Tutoring',
								'Small Group Tutoring Plus (Repeat takers only)'
							]}
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fld6uCkntQuX0OPoV}
						/>

						<Input
							name='fldkMTWKErNuBU6T8'
							placeholder=''
							id='fldkMTWKErNuBU6T8'
							type='text'
							label='Is this your first time taking a bar exam?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldkMTWKErNuBU6T8}
						/>

						<TextArea
							name='fldm8afesvLYLneJa'
							placeholder=''
							id='fldm8afesvLYLneJa'
							label='If you have taken the bar exam before, in what states have you taken the exam?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldm8afesvLYLneJa}
						/>

						<Input
							name='fldAfq9tmJSkQoWY9'
							placeholder=''
							id='fldAfq9tmJSkQoWY9'
							type='text'
							label='Have you passed the bar exam in any state? If so, which state(s)?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldAfq9tmJSkQoWY9}
						/>

						<Input
							name='fldUU0VpDYTbzWtsd'
							placeholder=''
							id='fldUU0VpDYTbzWtsd'
							type='number'
							label='If you have taken the bar exam before and did not pass, please state the specific number of times you have taken the bar exam unsuccessfully.'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldUU0VpDYTbzWtsd}
						/>

						<TextArea
							name='fldDnKFFvAZvbVUVN'
							placeholder=''
							id='fldDnKFFvAZvbVUVN'
							label='If you have taken the bar exam before and did not pass, why do you believe you were unsuccessful?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldDnKFFvAZvbVUVN}
						/>
						<div class='field'>
							<div class='file is-large'>
								<label
									for='fldTCYazP1i6TpN54'
									class={[
										'block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
									]}
								>
									<p class='label'>
										If you have taken the bar exam before, please upload copies
										of ALL past score reports.
									</p>
									<input
										type='file'
										multiple
										class='file-input'
										name='fldTCYazP1i6TpN54'
										id='fldTCYazP1i6TpN54'
									/>
									<span class='file-cta'>
										<span class='file-label'>Choose a file…</span>
									</span>

									{action.value?.failed && (
										<p>{action.value?.fieldErrors?.fldTCYazP1i6TpN54}</p>
									)}
								</label>
							</div>
						</div>
						<Input
							name='flddOp9eQeMLTBw9A'
							placeholder=''
							id='flddOp9eQeMLTBw9A'
							type='text'
							label='Which bar exam do you plan on taking?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.flddOp9eQeMLTBw9A}
						/>

						<TextArea
							name='fldnhtaVTa1Pxjbw7'
							placeholder=''
							id='fldnhtaVTa1Pxjbw7'
							label='If you will be working while studying for the bar exam, (1) what are your regular working hours?; and (2) are you able to take the last two full weeks before the bar exam off from work?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldnhtaVTa1Pxjbw7}
						/>

						<Input
							name='fldJwU5Gp6Y05nISw'
							placeholder='morning, afternoon or evening'
							id='fldJwU5Gp6Y05nISw'
							type='text'
							label='How many hours can you commit per week to studying for the bar exam?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldJwU5Gp6Y05nISw}
						/>

						<Input
							name='fldmI1JEq3tF59v5o'
							placeholder='morning, afternoon or evening'
							id='fldmI1JEq3tF59v5o'
							type='text'
							label='What time of day do you best study (i.e., morning, afternoon or evening)?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldmI1JEq3tF59v5o}
						/>

						<Input
							name='fldJAAoxLmmQUUKXb'
							placeholder=''
							id='fldJAAoxLmmQUUKXb'
							type='text'
							label='When would you like to start studying for the bar exam (i.e. November 1, December 1, etc.)?'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldJAAoxLmmQUUKXb}
						/>

						<Input
							name='fld14n4doLdMujJr4'
							placeholder=''
							id='fld14n4doLdMujJr4'
							type='text'
							label='Are you planning to take the MPRE while preparing for the bar exam?  If yes, please provide the date of the MPRE exam you plan to take.'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fld14n4doLdMujJr4}
						/>

						<TextArea
							id='fldcEvDnx7yDXGtaH'
							name='fldcEvDnx7yDXGtaH'
							label='Have you been granted testing accommodations for the bar exam?  If so, please state the testing accommodations you have received.'
							placeholder=''
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldcEvDnx7yDXGtaH}
						/>

						<TextArea
							name='fldwOFwQjp9mmzeCA'
							placeholder=''
							id='fldwOFwQjp9mmzeCA'
							label='Have you been granted (or did you receive) testing accommodations for law school exams? If so, please state the testing accommodations you have been granted or received.'
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldwOFwQjp9mmzeCA}
						/>

						<TextArea
							id='fldwJNJx8XuL9CH3o'
							name='fldwJNJx8XuL9CH3o'
							label='Please explain why you want to work with Agape Christian Bar Prep?'
							placeholder=''
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fldwJNJx8XuL9CH3o}
						/>

						<SingleSelect
							id='fld2LbhLsphcZ1NM3'
							name='fld2LbhLsphcZ1NM3'
							label='To complete your application, you MUST take a one-hour assessment. The assessment is administered under timed conditions by an Agape instructor.  Please select a date and time from below to take the assessment. Further details will be provided.'
							options={[
								'Tuesday, September 26, 2023 @ 7 p.m. EST',
								'Thursday, September 28, 2023 @ 7 p.m. EST',
								'Monday, October 2, 2023 @ 7 p.m. EST',
								'Wednesday, October 4, 2023 @ 7 p.m. EST',
								'Saturday, October 7, 2023 @ 10 a.m. EST'
							]}
							error={action.value?.failed}
							errorMsg={action.value?.fieldErrors?.fld2LbhLsphcZ1NM3}
						/>
					</section>

					<section class='section'>
						{action.value?.failed && <p>{}</p>}
						<button type='submit' class='button is-primary'>
							Submit
						</button>
					</section>
				</div>
			</Form>
		</>
	)
})
