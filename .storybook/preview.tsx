import type { Preview } from '@storybook/react-vite'
import { withThemeByClassName } from '@storybook/addon-themes'

import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          ['Colors', 'Typography', 'Spacing & Layout', 'Elevation & Motion', 'Iconography', 'Accessibility'],
          'Components',
          'Brand & Content',
          [
            'Voice & Tone',
            'Writing Principles',
            'Grammar & Mechanics',
            'Terminology',
            'Accessibility in Writing',
            'UI Copy Patterns',
          ],
          'Governance',
          'Contributing',
        ],
      },
    },
    a11y: {
      test: 'todo',
    },
    backgrounds: {
      disable: true,
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    (Story) => (
      <div className="bg-background text-foreground p-6 font-sans">
        <Story />
      </div>
    ),
  ],
}

export default preview
