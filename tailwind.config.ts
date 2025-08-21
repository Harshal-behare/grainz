import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
  			heading: ['var(--font-poppins)', 'system-ui', '-apple-system', 'sans-serif'],
  		},
  		fontSize: {
  			'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
  			'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.015em' }],
  			'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
  			'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
  			'xl': ['1.25rem', { lineHeight: '1.875rem', letterSpacing: '-0.015em' }],
  			'2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
  			'3xl': ['1.875rem', { lineHeight: '2.375rem', letterSpacing: '-0.025em' }],
  			'4xl': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.03em' }],
  			'5xl': ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.035em' }],
  			'6xl': ['3.75rem', { lineHeight: '4.25rem', letterSpacing: '-0.04em' }],
  			'7xl': ['4.5rem', { lineHeight: '5rem', letterSpacing: '-0.045em' }],
  			'8xl': ['6rem', { lineHeight: '6.5rem', letterSpacing: '-0.05em' }],
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'100': '25rem',
  			'120': '30rem',
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'float': 'float 6s ease-in-out infinite',
  			'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
  			'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
  			'fade-in-down': 'fade-in-down 0.8s ease-out forwards',
  			'scale-in': 'scale-in 0.6s ease-out forwards',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
