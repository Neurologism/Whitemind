import type { Edge } from '@vue-flow/core';
import { FlowOrientation, NodeDisplay } from '~/types/blocks.types';
import type { NodeGroupDefinition, EdgeColors } from '~/types/blocks.types';

function getPerceptronInputEdgeDisplayText(edge: Edge): string {
  const perceptronTrainingStore = usePerceptronTrainingStore();
  const inputWeight = perceptronTrainingStore.getInputWeight(edge);
  if (inputWeight === null) {
    return '?';
  }
  return inputWeight.toFixed(2).replace('0.', '.');
}

export const perceptronBlocks: NodeGroupDefinition[] = [
  {
    name: 'Perceptron',
    icon: 'solar:structure-bold',
    color: '#00bbf9',
    group_identifier: 'perceptron_base',
    default_width: 200,
    groups: [
      {
        name: 'UNCATEGORIZED',
        nodes: [
          {
            display: NodeDisplay.Circle,
            circleDiameter: 60,
            hideTopBar: true,
            type: 'input_value',
            name: 'Input Value',
            description: 'Provide an input value.',
            identifier: 'perceptron_input_variable',
            hideInput: true,
            hideOutput: true,
            data: {
              x: {
                type: 'id',
                flowOrientation: FlowOrientation.OUTPUT,
                constraints: {
                  allowedCategories: ['perceptron_input'],
                  min: 1,
                  max: 1,
                },
                edgeDisplayText: getPerceptronInputEdgeDisplayText,
              },
            },
          },
          {
            display: NodeDisplay.Circle,
            circleDiameter: 60,
            hideTopBar: true,
            type: 'bias',
            name: 'Bias Value',
            description: 'Provide a constant bias value.',
            identifier: 'perceptron_input_constant',
            hideInput: true,
            hideOutput: true,
            data: {
              bias: {
                type: 'id',
                flowOrientation: FlowOrientation.OUTPUT,
                constraints: {
                  allowedCategories: ['perceptron_input'],
                  min: 1,
                  max: 1,
                },
                edgeDisplayText: getPerceptronInputEdgeDisplayText,
              },
            },
          },
          {
            display: NodeDisplay.Circle,
            circleDiameter: 150,
            type: 'operator_add',
            name: 'Add',
            description: 'Calculate the sum of all input values.',
            identifier: 'perceptron_operator_add',
            hideInput: true,
            hideOutput: true,
            data: {
              summand: {
                type: 'id',
                flowOrientation: FlowOrientation.INPUT,
                constraints: {
                  allowedCategories: ['perceptron_input'],
                },
              },
              sum: {
                type: 'id',
                flowOrientation: FlowOrientation.OUTPUT,
                constraints: {
                  allowedCategories: ['perceptron_raw_output'],
                  min: 1,
                  max: 1,
                },
              },
            },
          },
        ],
      },
    ],
  },
  {
    name: 'Activation',
    icon: 'tabler:function',
    color: '#7cb518',
    group_identifier: 'perceptron_activation',
    default_width: 120,
    groups: [
      {
        name: 'UNCATEGORIZED',
        nodes: [
          {
            display: NodeDisplay.Classic,
            type: 'activation_sign',
            name: 'Sign',
            description: 'Outputs 1 if the input is positive, otherwise -1.',
            identifier: 'perceptron_activation_sign',
            hideInput: true,
            hideOutput: true,
            data: {
              input: {
                type: 'id',
                flowOrientation: FlowOrientation.INPUT,
                constraints: {
                  allowedCategories: ['perceptron_raw_output'],
                  max: 1,
                  min: 1,
                },
              },
              output: {
                type: 'id',
                flowOrientation: FlowOrientation.OUTPUT,
                constraints: {
                  allowedCategories: ['perceptron_activation_output'],
                  min: 1,
                  max: 1,
                },
              },
            },
          },
        ],
      },
    ],
  },
  {
    name: 'Output',
    icon: 'mdi:output',
    color: '#ef233c',
    group_identifier: 'perceptron_output',
    default_width: 160,
    groups: [
      {
        name: 'UNCATEGORIZED',
        nodes: [
          {
            display: NodeDisplay.Classic,
            type: 'output_simple',
            name: 'Output',
            description: 'Used to return the final output of the perceptron.',
            identifier: 'perceptron_output_simple',
            hideInput: true,
            hideOutput: true,
            data: {
              output: {
                type: 'id',
                flowOrientation: FlowOrientation.INPUT,
                constraints: {
                  allowedCategories: ['perceptron_activation_output'],
                  min: 1,
                  max: 1,
                },
              },
            },
          },
        ],
      },
    ],
  },
];

export const perceptronEdgeColors: EdgeColors = {
  perceptron_input: '#00bbf9',
  perceptron_raw_output: '#7cb518',
  perceptron_activation_output: '#ef233c',
};
