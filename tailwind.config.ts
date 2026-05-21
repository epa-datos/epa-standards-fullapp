import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(0 0% 3.6%)',
        card: 'hsl(0 0% 100%)',
        'card-foreground': 'hsl(0 0% 3.6%)',
        primary: 'hsl(142.3 70.6% 45.3%)',
        'primary-foreground': 'hsl(355.7 100% 97.3%)',
        secondary: 'hsl(217.2 91.2% 59.8%)',
        'secondary-foreground': 'hsl(213 96% 18%)',
        destructive: 'hsl(0 84.2% 60.2%)',
        'destructive-foreground': 'hsl(210 40% 98%)',
        muted: 'hsl(210 40% 96.1%)',
        'muted-foreground': 'hsl(215.4 16.3% 46.9%)',
        accent: 'hsl(142.3 70.6% 45.3%)',
        'accent-foreground': 'hsl(355.7 100% 97.3%)',
        input: 'hsl(214.3 31.8% 91.4%)',
        ring: 'hsl(142.3 70.6% 45.3%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}

export default config
