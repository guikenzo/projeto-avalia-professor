import tailwindColors from 'tailwindcss/colors';

const colors = {
  primary: '#1654A2',
  alert: {
    success: '#2DAC3E',
    error: '#DE3737',
  },
  black: tailwindColors.black,
  white: tailwindColors.white,
  transparent: tailwindColors.transparent,
  neutral: tailwindColors.neutral,
} as const;

export default colors;
