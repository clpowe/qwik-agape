import type { RegisteredComponent } from '@builder.io/sdk-qwik'
import MyHeroComponent from '~/components/Hero'
import ContentSectionOne from '~/components/ContentSectionOne'

export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
	{
		component: MyHeroComponent,
		name: 'MyHeroComponent',
		inputs: [
			{
				name: 'headline',
				type: 'string',
				defaultValue: 'Headline'
			},
			{
				name: 'subheading',
				type: 'string',
				defaultValue: 'Subheading'
			}
		]
	},
	{
		component: ContentSectionOne,
		name: 'ContentSectionOne',
		inputs: [
			{
				name: 'eyebrow',
				type: 'string',
				defaultValue: 'eyebrow'
			},
			{
				name: 'heading',
				type: 'string',
				defaultValue: 'heading'
			},
			{
				name: 'body',
				type: 'string',
				defaultValue: 'Lorem Ipsum'
			}
		]
	}
]
