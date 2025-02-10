import { FlowOrientation } from '~/types/blocks.types';
import type { NodeGroupDefinition } from '~/types/blocks.types';

export const perceptronBlocks: NodeGroupDefinition[] = [
  {
    name: 'PERCEPTRON',
    icon: 'solar:structure-bold',
    color: '#00bbf9',
    group_identifier: 'perceptron',
    default_width: 240,
    groups: [
      {
        name: 'placeholder',
        nodes: [
          {
            type: 'input',
            name: 'INPUT VALUE',
            description: 'Perceptron input value.',
            identifier: 'perceptron_input_variable',
            hideInput: true,
            hideOutput: true,
            data: {
              x: {
                type: 'id',
                flowOrientation: FlowOrientation.OUTPUT,
                constraints: {
                  allowedCategories: ['perceptron_input'],
                },
              },
            },
          },
          {
            type: 'constant',
            name: 'CONSTANT',
            description: 'Constant input value.',
            identifier: 'perceptron_input_constant',
            hideInput: true,
            hideOutput: true,
            data: {
              x: {
                type: 'id',
                flowOrientation: FlowOrientation.OUTPUT,
                constraints: {
                  allowedCategories: ['perceptron_input'],
                },
              },
            },
          },
        ],
      },
    ],
  },
];
