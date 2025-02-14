import type { ActivationFunction } from '~/types/activationFunction.type';

export const activationFunctionNodes = {
  activation_sign: (x) => (x >= 0 ? 1 : -1),
} as Record<string, ActivationFunction>;
