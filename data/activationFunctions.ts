import type { ActivationFunction } from '~/types/activationFunction.type';

export const activationFunctions = {
  sign: (x) => (x >= 0 ? 1 : -1),
} as Record<string, ActivationFunction>;
