import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
	content: {
		filesystem: ['**/*.{html,js,ts,jsx,tsx}']
	},
	shortcuts: {
		myContainer: 'max-w-7xl w-full mx-auto p-4'
	},
	presets: [presetUno()]
})
