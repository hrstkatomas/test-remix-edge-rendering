import type { Config } from "tailwindcss";

export default {
	content: ["./app/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			animation: {
				appear: "appear 1s ease",
			},
			keyframes: {
				appear: {
					"0%": {
						height: "0",
						width: "0",
						opacity: "0",
					},
					"100%": {
						height: "auto",
						width: "auto",
						opacity: "1",
					},
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
