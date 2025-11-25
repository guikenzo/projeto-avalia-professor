const colors = {
  primary: {
    100: '#24366E',
  },
  neutral: {
    black: '#000000',
    100: '#1C1C1E',
    80: '#454545',
    60: '#737373',
    40: '#A2A2A2',
    20: '#D1D0D0',
    white: '#FFFFFF',
    background: '#F1F1F1',
  },
  alert: {
    success: { primary: '#2DAC3E', secondary: '#ABDEB1' },
    error: { primary: '#DE3737', secondary: '#FFD2D2' },
    warning: { primary: '#E1CF36', secondary: '#FFFACB' },
  },
} as const;
export default colors;
