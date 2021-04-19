module.exports = {
	purge: {
		enabled: process.env.NODE_ENV === 'production',
		content: ['./src/**/*.tsx'],
	},
	darkMode: false,
	theme: {
		fontFamily: {
			sans: ['Montserrat', 'Roboto', 'serif'],
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
