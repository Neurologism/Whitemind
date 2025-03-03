import { type Edge } from '~/types/edge.type';
import { useVueFlow, type Node } from '@vue-flow/core';
import { FlowOrientation, NodeDisplay } from '~/types/blocks.types';
import type { NodeGroupDefinition, EdgeColors } from '~/types/blocks.types';
import { activationFunctionNodes } from '../activationFunctionNodes';

function getPerceptronInputEdgeDisplayText(edge: Edge): string {
  const perceptronTrainingStore = usePerceptronTrainingStore();
  const inputWeight = perceptronTrainingStore.getInputWeight(edge);
  if (inputWeight === null) {
    return '?';
  }
  if (Math.abs(inputWeight) < 1) {
    return inputWeight.toFixed(2).replace('0.', '.');
  } else if (Math.abs(Math.floor(inputWeight)) < 10) {
    return inputWeight.toFixed(1);
  } else {
    return String(Math.floor(inputWeight));
  }
}

export const perceptronBlocks: NodeGroupDefinition[] = [
  {
    name: 'Body',
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
            circleDiameter: 70,
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
                },
                edgeDisplayText: getPerceptronInputEdgeDisplayText,
                onConnected: (edge: Edge) => {
                  const perceptronTrainingStore = usePerceptronTrainingStore();
                  perceptronTrainingStore.onConnectedInput(edge);
                },
                onDisconnected: (edge: Edge) => {
                  const perceptronTrainingStore = usePerceptronTrainingStore();
                  perceptronTrainingStore.onDisconnectedInput(edge);
                },
                allowModifyDisplayText: true,
                setDisplayText: (edge: Edge, text: string) => {
                  const perceptronTrainingStore = usePerceptronTrainingStore();
                  const weightValue = Number(text);
                  if (isNaN(weightValue)) return;
                  perceptronTrainingStore.updateEdgeWeight(edge, weightValue);
                },
                dynamicAttributeName: (node: Node) => {
                  const perceptronTrainingStore = usePerceptronTrainingStore();
                  let inputNodeIndex = String(
                    perceptronTrainingStore.getInputNodeIndex(node.id)
                  );
                  if (inputNodeIndex === '-1') inputNodeIndex = 'i';
                  return `x<sub>${inputNodeIndex}</sub>`;
                },
                hasInput: true,
                getInputValue: (node: Node) => {
                  const perceptronTrainingStore = usePerceptronTrainingStore();
                  const inputNodeUserValue =
                    perceptronTrainingStore.getInputNodeUserValue(node.id);
                  return isNaN(inputNodeUserValue)
                    ? null
                    : String(inputNodeUserValue);
                },
                setInputValue: (node: Node, text: string) => {
                  const perceptronTrainingStore = usePerceptronTrainingStore();
                  const inputValue = Number(text);
                  if (isNaN(inputValue)) return;
                  perceptronTrainingStore.setInputNodeUserValue(
                    node.id,
                    inputValue
                  );
                },
              },
            },
            onNodeRemoval: (node: Node) => {
              const perceptronTrainingStore = usePerceptronTrainingStore();
              perceptronTrainingStore.onInputNodeRemoval(node);
            },
            onNodeCreation: (node: Node) => {
              const perceptronTrainingStore = usePerceptronTrainingStore();
              perceptronTrainingStore.data.inputNodeUserValues[node.id] = 0;
            },
            contextMenuOptions: [
              // {
              //   label: 'Assign',
              //   onClick: (node: Node) => {
              //   },
              // },
            ],
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
                onConnected: (edge: Edge) => {
                  const perceptronTrainingStore = usePerceptronTrainingStore();
                  perceptronTrainingStore.onConnectedInput(edge, 1);
                },
                onDisconnected: (edge: Edge) => {
                  const perceptronTrainingStore = usePerceptronTrainingStore();
                  perceptronTrainingStore.onDisconnectedInput(edge);
                },
                allowModifyDisplayText: true,
                setDisplayText: (edge: Edge, text: string) => {
                  const perceptronTrainingStore = usePerceptronTrainingStore();
                  const weightValue = Number(text);
                  if (isNaN(weightValue)) return;
                  perceptronTrainingStore.updateEdgeWeight(edge, weightValue);
                },
              },
            },
            onNodeRemoval: (node: Node) => {
              const perceptronTrainingStore = usePerceptronTrainingStore();
              perceptronTrainingStore.onInputNodeRemoval(node);
            },
          },
          // {
          //   display: NodeDisplay.Circle,
          //   circleDiameter: 60,
          //   hideTopBar: true,
          //   type: 'perceptron_output_to_input_value',
          //   name: 'Output to Input',
          //   description:
          //     'Use the output of a perceptron as input for the next one. ',
          //   identifier: 'perceptron_output_to_input_value',
          //   hideInput: true,
          //   hideOutput: true,
          //   data: {
          //     y: {
          //       type: 'id',
          //       flowOrientation: FlowOrientation.INPUT,
          //       constraints: {
          //         allowedCategories: ['perceptron_activation_output'],
          //         min: 1,
          //         max: 1,
          //       },
          //     },
          //     x: {
          //       type: 'id',
          //       flowOrientation: FlowOrientation.OUTPUT,
          //       constraints: {
          //         allowedCategories: ['perceptron_input'],
          //       },
          //       edgeDisplayText: getPerceptronInputEdgeDisplayText,
          //       onConnected: (edge: Edge) => {
          //         const perceptronTrainingStore = usePerceptronTrainingStore();
          //         perceptronTrainingStore.onConnectedInput(edge);
          //       },
          //       onDisconnected: (edge: Edge) => {
          //         const perceptronTrainingStore = usePerceptronTrainingStore();
          //         perceptronTrainingStore.onDisconnectedInput(edge);
          //       },
          //       allowModifyDisplayText: true,
          //       setDisplayText: (edge: Edge, text: string) => {
          //         const perceptronTrainingStore = usePerceptronTrainingStore();
          //         const weightValue = Number(text);
          //         if (isNaN(weightValue)) return;
          //         perceptronTrainingStore.updateEdgeWeight(edge, weightValue);
          //       },
          //     },
          //   },
          //   onNodeRemoval: (node: Node) => {
          //     const perceptronTrainingStore = usePerceptronTrainingStore();
          //     perceptronTrainingStore.onInputNodeRemoval(node);
          //   },
          // },
          {
            display: NodeDisplay.Circle,
            circleDiameter: 150,
            type: 'operator_add',
            name: 'Add',
            description: 'Calculate the sum of all input values.',
            identifier: 'perceptron_operator_add',
            hideInput: true,
            hideOutput: true,
            onNodeCreation: (node: Node) => {
              const perceptronTrainingStore = usePerceptronTrainingStore();
              perceptronTrainingStore.onOperatorNodeCreation(node);
            },
            onNodeRemoval: (node: Node) => {
              const perceptronTrainingStore = usePerceptronTrainingStore();
              perceptronTrainingStore.onOperatorNodeRemoval(node);
            },
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
                edgeDisplayText: (edge: Edge) => {
                  const perceptronTrainingStore = usePerceptronTrainingStore();
                  const perceptron =
                    perceptronTrainingStore.getOperatorNodePerceptron(
                      edge.source
                    );
                  if (!perceptron) {
                    console.error('Perceptron not found.');
                    return '';
                  }
                  return String(
                    perceptronTrainingStore.calculatePerceptronRawOutput(
                      perceptron
                    )
                  );
                },
                onConnected(edge) {
                  const perceptronTrainingStore = usePerceptronTrainingStore();
                  const vueFlowStore = useVueFlowStore();
                  const perceptron =
                    perceptronTrainingStore.getOperatorNodePerceptron(
                      edge.source
                    );
                  if (!perceptron) {
                    console.error('Perceptron not found.');
                    return;
                  }
                  const signNode = vueFlowStore.getNode(edge.target);
                  if (!signNode) {
                    console.error('Sign Node not found.');
                    return;
                  }
                  perceptron.signNode = signNode;
                  perceptron.activationFunctionNodeType =
                    signNode.type ?? 'activation_none';
                },
                onDisconnected(edge) {
                  const perceptronTrainingStore = usePerceptronTrainingStore();
                  const perceptron =
                    perceptronTrainingStore.getSignNodePerceptron(edge.target);
                  if (!perceptron) {
                    console.error('Perceptron not found.');
                    return;
                  }
                  perceptron.signNode = undefined;
                  perceptron.activationFunctionNodeType = 'activation_none';
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
                },
                edgeDisplayText: (edge: Edge) => {
                  const perceptronTrainingStore = usePerceptronTrainingStore();
                  const perceptron =
                    perceptronTrainingStore.getSignNodePerceptron(edge.source);
                  if (!perceptron) {
                    console.error('Perceptron not found.');
                    return '';
                  }
                  return String(
                    perceptronTrainingStore.calculatePerceptronSignedOutput(
                      perceptron
                    )
                  );
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
