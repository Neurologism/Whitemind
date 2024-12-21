import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        customPrimary: colors.blue,
        customBlue: '#003ff0ff',
        customPurple: '#003ff0ff',
      },
    },
  },
};
