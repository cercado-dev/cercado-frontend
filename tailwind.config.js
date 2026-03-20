/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				cyan: {
					50: '#E6F7FC',
					100: '#cff7fc',
					500: '#00B8E6',
					700: '#0891b2'
				},
				magenta: {
					50: '#FCE6F2',
					100: '#FACDE5',
					400: '#EB3894',
					500: '#E6007E',
					600: '#B80065',
					700: '#8A004C'
				},
				yellow: {
					50: '#FFF9E6',
					100: '#fef3c7',
					500: '#FFD700',
					700: '#ca8a04'
				},
				emerald: {
					50: '#ecfdf5',
					100: '#d1fae5',
					500: '#10b981',
					700: '#047857'
				},
				violet: {
					50: '#f5f3ff',
					100: '#ede9fe',
					500: '#8b5cf6',
					700: '#6d28d9'
				},
				rose: {
					50: '#fff1f2',
					100: '#ffe4e6',
					500: '#f43f5e',
					700: '#e11d48'
				},
				orange: {
					100: '#fed7aa',
					500: '#f97316'
				},
				'key-black': '#222222'
			},
			borderRadius: {
				card: '16px',
				xl: '16px',
				'2xl': '20px'
			},
			fontFamily: {
				sans: ['DM Sans', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace']
			}
		}
	},
	plugins: []
};
