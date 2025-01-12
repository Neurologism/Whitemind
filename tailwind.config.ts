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
      },
    },
  },
};
