import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        customPrimary: colors.blue,
        logoBlueBright: '#00b8fc',
        logoBlueDark: '#009cf0',
        customPurple: '#003ff0ff',
        customBlue: {
          '100': '#caf0f8',
          '200': '#ade8f4',
          '300': '#90e0ef',
          '400': '#48cae4',
          '500': '#00b4d8',
          '600': '#0096c7',
          '700': '#0077b6',
          '800': '#023e8a',
          '900': '#03045e',
        },
        button: {
          blue: '#2196f3',
          'blue-dark': '#1976d2',
        },
        bg: {
          1: '#000000',
          2: '#111827',
          3: '#1f2937',
          4: '#374151',
          5: '#4b5563',
        },
        accent: {
          9: '#111827',
          8: '#1f2937',
          7: '#374151',
          6: '#4b5563',
          5: '#6b7280',
          4: '#9ca3af',
          3: '#d1d5db',
          2: '#e5e7eb',
          1: '#f3f4f6',
        },
        text: {
          1: '#ffffff',
          '1.5': '#e5e7eb',
          2: '#9ca3af',
          3: '#4b5563',
        },
      },
    },
  },
};
