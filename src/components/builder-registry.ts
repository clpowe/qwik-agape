import type { RegisteredComponent } from '@builder.io/sdk-qwik'
import MyHeroComponent from '~/components/Hero'
import ContentSectionOne from '~/components/ContentSectionOne'
import ContentSectionTwo from '~/components/ContentSectionTwo'
import Title from '~/components/Title'
import Body from '~/components/Body'
import Section from '~/components/Section'
import GridMenu from '~/components/GridMenu'
import InnerHero from '~/components/InnerHero'
import Testimonials from '~/components/Testimonials'
import JoinOurTeam from './JoinOurTeam'
import Footer from './Footer'
import Feature from './Feature'
import TeacherSection from './TeacherSection'
import ClickableItem from './ClickableItem'
import ContentTitle from './ContentTitle'

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
				name: 'heading',
				type: 'string',
				defaultValue: 'heading'
			},
			{
				name: 'headingSecondary',
				type: 'string',
				defaultValue: 'heading'
			},
			{
				name: 'body',
				type: 'string',
				defaultValue: 'Lorem Ipsum'
			},
			{
				name: 'ctaText',
				type: 'string',
				defaultValue: 'Lorem Ipsum'
			},
			{
				name: 'img',
				type: 'string',
				defaultValue: 'Lorem Ipsum'
			}
		]
	},
	{
		component: ContentSectionTwo,
		name: 'ContentSectionTwo',
		inputs: [
			{
				name: 'heading',
				type: 'string',
				defaultValue: 'heading'
			},
			{
				name: 'headingSecondary',
				type: 'string',
				defaultValue: 'heading'
			},
			{
				name: 'body1',
				type: 'string',
				defaultValue: 'Lorem Ipsum'
			},
			{
				name: 'body2',
				type: 'string',
				defaultValue: 'Lorem Ipsum'
			}
		]
	},
	{
		component: Title,
		name: 'Title',
		inputs: [
			{
				name: 'title',
				type: 'string',
				defaultValue: 'heading'
			},
			{
				name: 'eyebrow',
				type: 'eyebrow',
				defaultValue: 'heading'
			},
			{
				name: 'titleSecondary',
				type: 'string',
				defaultValue: 'heading'
			}
		]
	},
	{
		component: ContentTitle,
		name: 'Title',
		inputs: [
			{
				name: 'title',
				type: 'string',
				defaultValue: 'heading'
			},
			{
				name: 'eyebrow',
				type: 'eyebrow',
				defaultValue: 'heading'
			},
			{
				name: 'titleSecondary',
				type: 'string',
				defaultValue: 'heading'
			}
		]
	},
	{
		component: Body,
		name: 'Body',
		inputs: [
			{
				name: 'text',
				type: 'string',
				defaultValue: 'heading'
			}
		]
	},
	{
		component: ClickableItem,
		name: 'ClickableItem',
		inputs: [
			{
				name: 'text',
				type: 'string',
				defaultValue: 'heading'
			},
			{
				name: 'href',
				type: 'string',
				defaultValue: 'heading'
			},
			{
				name: 'color',
				type: 'string',
				defaultValue: 'heading'
			}
		]
	},
	{
		component: Section,
		name: 'Section',
		inputs: [
			{
				name: 'heading',
				type: 'string',
				defaultValue: 'heading'
			},
			{
				name: 'headingSecondary',
				type: 'string',
				defaultValue: 'heading'
			},
			{
				name: 'body',
				type: 'string',
				defaultValue: 'heading'
			}
		]
	},
	{
		component: GridMenu,
		name: 'GridMenu'
	},
	{
		component: JoinOurTeam,
		name: 'JoinOurTeam'
	},
	{
		component: TeacherSection,
		name: 'TeacherSection'
	},
	{
		component: Testimonials,
		name: 'Testimonials'
	},
	{
		component: Footer,
		name: 'Footer'
	},
	{
		component: Feature,
		name: 'Feature',
		inputs: [
			{
				name: 'body1',
				type: 'string',
				defaultValue: 'heading'
			},
			{
				name: 'body2',
				type: 'string',
				defaultValue: 'heading'
			},
			{
				name: 'body3',
				type: 'string',
				defaultValue: ''
			}
		]
	},
	{
		component: InnerHero,
		name: 'InnerHero',
		inputs: [
			{
				name: 'headline',
				type: 'string',
				defaultValue: 'heading'
			},
			{
				name: 'subheading',
				type: 'string',
				defaultValue: 'heading'
			},
			{
				name: 'image',
				type: 'string',
				defaultValue: ''
			}
		]
	}
]
