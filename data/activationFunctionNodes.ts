export const activationFunctionNodes = {
  activation_none: (x) => x,
  activation_sign: (x) => (x >= 0 ? 1 : -1),
} as Record<string, (x: number) => number>;
