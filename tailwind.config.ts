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
      },
    },
  },
};
