/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react'

// Create React component standard way
import { Tab } from '@headlessui/react'

type Admission = {
	admission: string
}
type Education = {
	school: string
}
type Expertise = {
	expertise: string
}

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ')
}

function MyTabs({
	addmissions,
	education,
	expertise
}: {
	addmissions: Admission[]
	education: Education[]
	expertise: Expertise[]
}) {
	return (
		<Tab.Group>
			<Tab.List className='flex space-x-1 rounded-xl  p-1'>
				<Tab
					className={({ selected }) =>
						classNames(
							'w-full rounded-lg py-2.5 text-sm font-medium leading-5 ',
							'ring-white ring-opacity-60 ring-offset-2  focus:outline-none focus:ring-2',
							selected
								? 'bg-white shadow'
								: ' hover:bg-white/[0.12] hover:text-red-8'
						)
					}
				>
					Education
				</Tab>
				<Tab
					className={({ selected }) =>
						classNames(
							'w-full rounded-lg py-2.5 text-sm font-medium leading-5 ',
							'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
							selected
								? 'bg-white shadow'
								: ' hover:bg-white/[0.12] hover:text-red-8'
						)
					}
				>
					Bar Admissions
				</Tab>
				<Tab
					className={({ selected }) =>
						classNames(
							'w-full rounded-lg py-2.5 text-sm font-medium leading-5 ',
							'ring-white ring-opacity-60 ring-offset-2  focus:outline-none focus:ring-2',
							selected
								? 'bg-white shadow'
								: ' hover:bg-white/[0.12] hover:text-red-8'
						)
					}
				>
					Expertise
				</Tab>
			</Tab.List>
			<Tab.Panels>
				<Tab.Panel
					className={classNames(
						'rounded-xl bg-white p-3',
						'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2'
					)}
				>
					<ul>
						{education.map((edu: any, index: number) => {
							return <li key={index}>{edu.school}</li>
						})}
					</ul>
				</Tab.Panel>
				<Tab.Panel
					className={classNames(
						'rounded-xl bg-white p-3',
						'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2'
					)}
				>
					<ul>
						{addmissions.map((bar: Admission, index: number) => {
							return <li key={index}>{bar.admission}</li>
						})}
					</ul>
				</Tab.Panel>
				<Tab.Panel
					className={classNames(
						'rounded-xl bg-white p-3',
						'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2'
					)}
				>
					<ul>
						{expertise.map((exp: any, index: number) => {
							return <li key={index}>{exp.expertise}</li>
						})}
					</ul>
				</Tab.Panel>
			</Tab.Panels>
		</Tab.Group>
	)
}

// Convert React component to Qwik component
export const Tabs = qwikify$(MyTabs, { eagerness: 'hover' })
