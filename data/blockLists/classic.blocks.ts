import type { EdgeColors, NodeGroupDefinition } from '~/types/blocks.types';
import { FlowOrientation, NodeDisplay } from '~/types/blocks.types';

export const classicBlocks: NodeGroupDefinition[] = [
  {
    name: 'DATASETS',
    icon: 'mdi-database',
    color: '#ff5722',
    group_identifier: 'dataset',
    default_width: 240,
    groups: [
      {
        name: 'UNCATEGORIZED',
        nodes: [
          {
            display: NodeDisplay.Classic,
            type: 'dataset',
            name: 'Dataset',
            description: 'Select or Upload a dataset to use with your project',
            identifier: 'dataset',
            hideInput: true,
            hideOutput: true,
            data: {},
          },
          {
            display: NodeDisplay.Classic,
            type: 'mnist',
            name: 'MNIST',
            description: 'Load the MNIST dataset.',
            identifier: 'dataset_mnist',
            hideInput: true,
            hideOutput: true,
            data: {
              batch_size: {
                type: 'float',
                value: 32,
              },
              train: {
                type: 'id',
                flowOrientation: FlowOrientation.OUTPUT,
                constraints: {
                  allowedCategories: ['dataset'],
                },
              },
              test: {
                type: 'id',
                flowOrientation: FlowOrientation.OUTPUT,
                constraints: {
                  allowedCategories: ['dataset'],
                },
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'wine_quality',
            name: 'Wine Quality',
            description: 'Load the Wine Quality dataset.',
            identifier: 'dataset_wine_quality',
            hideInput: true,
            hideOutput: true,
            data: {
              batch_size: {
                type: 'float',
                value: 32,
              },
              train: {
                type: 'id',
                flowOrientation: FlowOrientation.OUTPUT,
                constraints: {
                  allowedCategories: ['dataset'],
                },
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'split',
            name: 'Split',
            description: 'Split the dataset into two parts.',
            identifier: 'split',
            hideInput: false,
            hideOutput: true,
            inputConstraints: {
              allowedCategories: ['dataset'],
              max: 1,
              min: 1,
            },
            data: {
              ratio: {
                type: 'range',
                min: 0,
                max: 1,
                step: 0.01,
                value: 0.75,
                inline: true,
              },
              split1: {
                type: 'id',
                flowOrientation: FlowOrientation.OUTPUT,
                constraints: {
                  allowedCategories: ['dataset'],
                },
              },
              split2: {
                type: 'id',
                flowOrientation: FlowOrientation.OUTPUT,
                constraints: {
                  allowedCategories: ['dataset'],
                },
              },
            },
          },
        ],
      },
    ],
  },
  {
    name: 'MODELS',
    icon: 'mdi-cube',
    color: 'teal',
    group_identifier: 'model',
    default_width: 350,
    groups: [
      {
        name: 'UNCATEGORIZED',
        nodes: [
          {
            display: NodeDisplay.Classic,
            type: 'Model',
            name: 'Model',
            description: 'Create and compile a new model.',
            identifier: 'Model',
            hideInput: true,
            outputConstraints: {
              allowedCategories: ['model'],
              max: 1,
              min: 1,
            },
            data: {
              input: {
                type: 'id',
                flowOrientation: FlowOrientation.OUTPUT,
                invertPosition: true,
                required: true,
                constraints: {
                  allowedCategories: ['layer'],
                  max: 1,
                  min: 1,
                },
              },
              output: {
                type: 'id',
                flowOrientation: FlowOrientation.INPUT,
                invertPosition: true,
                required: true,
                constraints: {
                  allowedCategories: ['layer'],
                  max: 1,
                  min: 1,
                },
              },

              optimizer: {
                type: 'select',
                options: [
                  'sgd',
                  'rmsprop',
                  'adam',
                  'adadelta',
                  'adagrad',
                  'adamax',
                  'nadam',
                  'ftrl',
                ],
                value: 'adam',
              },
              loss: {
                type: 'select',
                options: [
                  'mean_squared_error',
                  'mean_absolute_error',
                  'mean_absolute_percentage_error',
                  'mean_squared_logarithmic_error',
                  'squared_hinge',
                  'hinge',
                  'categorical_hinge',
                  'logcosh',
                  'huber',
                  'categorical_crossentropy',
                  'sparse_categorical_crossentropy',
                  'binary_crossentropy',
                  'kullback_leibler_divergence',
                  'poisson',
                  'cosine_similarity',
                  'mean_squared_error',
                  'mean_absolute_error',
                  'mean_absolute_percentage_error',
                  'mean_squared_logarithmic_error',
                  'squared_hinge',
                  'hinge',
                  'categorical_hinge',
                  'logcosh',
                  'huber',
                  'categorical_crossentropy',
                  'sparse_categorical_crossentropy',
                  'binary_crossentropy',
                  'kullback_leibler_divergence',
                  'poisson',
                  'cosine_similarity',
                ],
                value: 'categorical_crossentropy',
              },
              metrics: {
                type: 'multiselect',
                options: [
                  'accuracy',
                  'binary_accuracy',
                  'categorical_accuracy',
                  'top_k_categorical_accuracy',
                  'sparse_top_k_categorical_accuracy',
                  'sparse_categorical_accuracy',
                  'cosine_similarity',
                  'mean_absolute_error',
                  'mean_absolute_percentage_error',
                  'mean_squared_error',
                  'mean_squared_logarithmic_error',
                  'logcosh',
                  'hinge',
                  'squared_hinge',
                  'categorical_hinge',
                  'kullback_leibler_divergence',
                  'poisson',
                  'cosine_proximity',
                ],
                value: ['accuracy'],
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'fit',
            name: 'fit',
            description: 'Fit the model.',
            identifier: 'fit',
            inputConstraints: {
              allowedCategories: ['model'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['model'],
              max: 1,
              min: 1,
            },
            data: {
              data: {
                type: 'id',
                flowOrientation: FlowOrientation.INPUT,
                constraints: {
                  allowedCategories: ['dataset'],
                  max: 1,
                  min: 1,
                },
              },
              validation_data: {
                type: 'id',
                flowOrientation: FlowOrientation.INPUT,
                constraints: {
                  allowedCategories: ['dataset'],
                  max: 1,
                },
              },
              visualizers: {
                type: 'id',
                flowOrientation: FlowOrientation.OUTPUT,
                constraints: {
                  allowedCategories: ['visualizer'],
                },
              },
              epochs: {
                type: 'int',
                value: 10,
                min: 1,
                step: 1,
              },
              early_stopping: {
                type: 'float',
                value: null,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'evaluate',
            name: 'evaluate',
            description: 'Evaluate the model.',
            identifier: 'evaluate',
            inputConstraints: {
              allowedCategories: ['model'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['model'],
              max: 1,
              min: 1,
            },
            data: {
              data: {
                type: 'id',
                flowOrientation: FlowOrientation.INPUT,
                constraints: {
                  allowedCategories: ['dataset'],
                  max: 1,
                  min: 1,
                },
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'export',
            name: 'export',
            description: 'Export the model.',
            identifier: 'export',
            inputConstraints: {
              allowedCategories: ['model'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['model'],
              max: 1,
              min: 1,
            },
            data: {
              format: {
                type: 'select',
                options: ['onnx'],
                value: 'onnx',
              },
            },
          },
        ],
      },
    ],
  },
  {
    name: 'VISUALIZER',
    icon: 'mdi-chart-line',
    color: 'purple',
    group_identifier: 'visualizer',
    groups: [
      {
        name: 'UNCATEGORIZED',
        nodes: [
          {
            display: NodeDisplay.Classic,
            type: 'line-chart',
            name: 'Line Chart',
            hideOutput: true,
            description: 'Plots a line chart while training the model.',
            identifier: 'line-chart',
            minSize: { width: 450, height: 300 },
            inputConstraints: {
              allowedCategories: ['visualizer'],
              max: 1,
            },
            data: {
              x_label: {
                type: 'select',
                options: ['epoch'],
                value: 'epoch',
              },
              y_label: {
                type: 'select',
                options: ['loss', 'accuracy', 'mean_absolute_error'],
                value: 'loss',
              },
            },
          },
        ],
      },
    ],
  },
  {
    name: 'LAYERS',
    icon: 'mdi-layers',
    color: 'green',
    group_identifier: 'layer',
    default_width: 280,
    groups: [
      {
        name: 'CORE LAYERS',
        nodes: [
          {
            display: NodeDisplay.Classic,
            type: 'input_layer',
            name: 'Input Layer',
            identifier: 'input',
            description: 'Layer that accepts input data.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              batch_size: {
                type: 'float',
                value: null,
              },
              dtype: {
                type: 'select',
                options: [
                  'float32',
                  'float64',
                  'int32',
                  'uint8',
                  'int16',
                  'int8',
                  'int64',
                  'complex64',
                  'complex128',
                  'bool',
                  'string',
                ],
                value: 'float32',
              },
              sparse: {
                type: 'boolean',
                value: false,
                inline: true,
              },
              optional: {
                type: 'boolean',
                value: false,
                inline: true,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'dense',
            name: 'Dense Layer',
            identifier: 'dense',
            description: 'Just your regular densely-connected NN layer.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              units: {
                type: 'float',
              },
              activation: {
                type: 'select',
                options: [
                  'relu',
                  'sigmoid',
                  'softmax',
                  'softplus',
                  'softsign',
                  'tanh',
                  'selu',
                  'elu',
                  'exponential',
                  'leaky_relu',
                  'relu6',
                  'silu',
                  'hard_silu',
                  'gelu',
                  'hard_sigmoid',
                  'linear',
                  'mish',
                  'log_softmax',
                ],
                value: null,
              },
              use_bias: {
                type: 'boolean',
                value: true,
                inline: true,
              },
              lora_rank: {
                type: 'float',
                value: null,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'activation',
            name: 'Activation Layer',
            identifier: 'activation',
            description: 'Applies an activation function to an output.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              activation: {
                type: 'select',
                options: [
                  'relu',
                  'sigmoid',
                  'softmax',
                  'softplus',
                  'softsign',
                  'tanh',
                  'selu',
                  'elu',
                  'exponential',
                  'leaky_relu',
                  'relu6',
                  'silu',
                  'hard_silu',
                  'gelu',
                  'hard_sigmoid',
                  'linear',
                  'mish',
                  'log_softmax',
                ],
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'embedding',
            name: 'Embedding Layer',
            identifier: 'embedding',
            description:
              'Turns positive integers (indexes) into dense vectors of fixed size.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              input_dim: {
                type: 'float',
              },
              output_dim: {
                type: 'float',
              },
              mask_zero: {
                type: 'boolean',
                value: false,
                inline: true,
              },
              lora_rank: {
                type: 'float',
                value: null,
              },
            },
          },
        ],
      },
      {
        name: 'CONVOLUTION LAYERS',
        nodes: [
          {
            display: NodeDisplay.Classic,
            type: 'conv1d',
            name: '1D Convolution Layer',
            identifier: 'conv1d',
            description: '1D convolution layer.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              filters: {
                type: 'int',
              },
              kernel_size: {
                type: 'int',
              },
              strides: {
                type: 'int',
                value: 1,
              },
              padding: {
                type: 'select',
                options: ['valid', 'same'],
                value: 'valid',
              },
              data_format: {
                type: 'select',
                options: ['channels_first', 'channels_last'],
                value: 'channels_last',
              },
              dilation_rate: {
                type: 'int',
                value: 1,
              },
              groups: {
                type: 'int',
                value: 1,
              },
              activation: {
                type: 'select',
                options: [
                  'relu',
                  'sigmoid',
                  'softmax',
                  'softplus',
                  'softsign',
                  'tanh',
                  'selu',
                  'elu',
                  'exponential',
                  'leaky_relu',
                  'relu6',
                  'silu',
                  'hard_silu',
                  'gelu',
                  'hard_sigmoid',
                  'linear',
                  'mish',
                  'log_softmax',
                ],
                value: null,
              },
              use_bias: {
                type: 'boolean',
                value: true,
                inline: true,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'conv2d',
            name: '2D Convolution Layer',
            identifier: 'conv2d',
            description: '2D convolution layer.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              filters: {
                type: 'int',
              },
              kernel_size: {
                type: 'tuple',
                itemType: 'int',
                inline: true,
              },
              strides: {
                type: 'tuple',
                itemType: 'int',
                inline: true,
                // value: [1, 1],
              },
              padding: {
                type: 'select',
                options: ['valid', 'same'],
                value: 'valid',
              },
              data_format: {
                type: 'select',
                options: ['channels_first', 'channels_last'],
                value: 'channels_last',
              },
              dilation_rate: {
                type: 'tuple',
                itemType: 'int',
                inline: true,
                // value: [1, 1],
              },
              groups: {
                type: 'int',
                value: 1,
              },
              activation: {
                type: 'select',
                options: [
                  'relu',
                  'sigmoid',
                  'softmax',
                  'softplus',
                  'softsign',
                  'tanh',
                  'selu',
                  'elu',
                  'exponential',
                  'leaky_relu',
                  'relu6',
                  'silu',
                  'hard_silu',
                  'gelu',
                  'hard_sigmoid',
                  'linear',
                  'mish',
                  'log_softmax',
                ],
                value: null,
              },
              use_bias: {
                type: 'boolean',
                value: true,
                inline: true,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'conv3d',
            name: '3D Convolution Layer',
            identifier: 'conv3d',
            description: '3D convolution layer.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              filters: {
                type: 'int',
              },
              kernel_size: {
                type: 'tuple',
                itemType: 'int',
                inline: true,
              },
              strides: {
                type: 'tuple',
                itemType: 'int',
                inline: true,
                // value: [1, 1, 1],
              },
              padding: {
                type: 'select',
                options: ['valid', 'same'],
                value: 'valid',
              },
              data_format: {
                type: 'select',
                options: ['channels_first', 'channels_last'],
                value: 'channels_last',
              },
              dilation_rate: {
                type: 'tuple',
                itemType: 'int',
                inline: true,
                // value: [1, 1, 1],
              },
              groups: {
                type: 'int',
                value: 1,
              },
              activation: {
                type: 'select',
                options: [
                  'relu',
                  'sigmoid',
                  'softmax',
                  'softplus',
                  'softsign',
                  'tanh',
                  'selu',
                  'elu',
                  'exponential',
                  'leaky_relu',
                  'relu6',
                  'silu',
                  'hard_silu',
                  'gelu',
                  'hard_sigmoid',
                  'linear',
                  'mish',
                  'log_softmax',
                ],
                value: null,
              },
              use_bias: {
                type: 'boolean',
                value: true,
                inline: true,
              },
            },
          },
        ],
      },
      {
        name: 'POOLING LAYERS',
        nodes: [
          {
            display: NodeDisplay.Classic,
            type: 'maxpooling1d',
            name: 'MaxPooling1D Layer',
            identifier: 'maxpooling1d',
            description: 'Max pooling operation for 1D temporal data.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              pool_size: {
                type: 'int',
              },
              strides: {
                type: 'int',
                value: null,
              },
              padding: {
                type: 'select',
                options: ['valid', 'same'],
                value: 'valid',
              },
              data_format: {
                type: 'select',
                options: ['channels_first', 'channels_last'],
                value: 'channels_last',
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'maxpooling2d',
            name: 'MaxPooling2D Layer',
            identifier: 'maxpooling2d',
            description: 'Max pooling operation for 2D spatial data.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              pool_size: {
                type: 'tuple',
                itemType: 'int',
                inline: true,
                // value: [2, 2],
              },
              strides: {
                type: 'tuple',
                itemType: 'int',
                inline: true,
              },
              padding: {
                type: 'select',
                options: ['valid', 'same'],
                value: 'valid',
              },
              data_format: {
                type: 'select',
                options: ['channels_first', 'channels_last'],
                value: 'channels_last',
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'maxpooling3d',
            name: 'MaxPooling3D Layer',
            identifier: 'maxpooling3d',
            description: 'Max pooling operation for 3D data.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              pool_size: {
                type: 'tuple',
                itemType: 'int',
                inline: true,
              },
              strides: {
                type: 'tuple',
                itemType: 'int',
                inline: true,
              },
              padding: {
                type: 'select',
                options: ['valid', 'same'],
                value: 'valid',
              },
              data_format: {
                type: 'select',
                options: ['channels_first', 'channels_last'],
                value: 'channels_last',
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'averagepooling1d',
            name: 'AveragePooling1D Layer',
            identifier: 'averagepooling1d',
            description: 'Average pooling operation for temporal data.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              pool_size: {
                type: 'int',
              },
              strides: {
                type: 'int',
                value: null,
              },
              padding: {
                type: 'select',
                options: ['valid', 'same'],
                value: 'valid',
              },
              data_format: {
                type: 'select',
                options: ['channels_first', 'channels_last'],
                value: 'channels_last',
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'averagepooling2d',
            name: 'AveragePooling2D Layer',
            identifier: 'averagepooling2d',
            description: 'Average pooling operation for spatial data.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              pool_size: {
                type: 'tuple',
                itemType: 'int',
                inline: true,
                // value: [2, 2],
              },
              strides: {
                type: 'tuple',
                itemType: 'int',
                inline: true,
              },
              padding: {
                type: 'select',
                options: ['valid', 'same'],
                value: 'valid',
              },
              data_format: {
                type: 'select',
                options: ['channels_first', 'channels_last'],
                value: 'channels_last',
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'averagepooling3d',
            name: 'AveragePooling3D Layer',
            identifier: 'averagepooling3d',
            description: 'Average pooling operation for 3D data.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              pool_size: {
                type: 'tuple',
                itemType: 'int',
                inline: true,
              },
              strides: {
                type: 'tuple',
                itemType: 'int',
                inline: true,
              },
              padding: {
                type: 'select',
                options: ['valid', 'same'],
                value: 'valid',
              },
              data_format: {
                type: 'select',
                options: ['channels_first', 'channels_last'],
                value: 'channels_last',
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'globalmaxpooling1d',
            name: 'GlobalMaxPooling1D Layer',
            identifier: 'globalmaxpooling1d',
            description: 'Global max pooling operation for temporal data.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              data_format: {
                type: 'select',
                options: ['channels_first', 'channels_last'],
                value: 'channels_last',
              },
              keepdims: {
                type: 'boolean',
                value: false,
                inline: true,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'globalmaxpooling2d',
            name: 'GlobalMaxPooling2D Layer',
            identifier: 'globalmaxpooling2d',
            description: 'Global max pooling operation for 2D data.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              data_format: {
                type: 'select',
                options: ['channels_first', 'channels_last'],
                value: 'channels_last',
              },
              keepdims: {
                type: 'boolean',
                value: false,
                inline: true,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'globalmaxpooling3d',
            name: 'GlobalMaxPooling3D Layer',
            identifier: 'globalmaxpooling3d',
            description: 'Global max pooling operation for 3D data.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              data_format: {
                type: 'select',
                options: ['channels_first', 'channels_last'],
                value: 'channels_last',
              },
              keepdims: {
                type: 'boolean',
                value: false,
                inline: true,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'globalaveragepooling1d',
            name: 'GlobalAveragePooling1D layer',
            identifier: 'globalaveragepooling1d',
            description: 'Global average pooling operation for temporal data.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              data_format: {
                type: 'select',
                options: ['channels_first', 'channels_last'],
                value: 'channels_last',
              },
              keepdims: {
                type: 'boolean',
                value: false,
                inline: true,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'globalaveragepooling2d',
            name: 'GlobalAveragePooling2D Layer',
            identifier: 'globalaveragepooling2d',
            description: 'Global average pooling operation for 2D data.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              data_format: {
                type: 'select',
                options: ['channels_first', 'channels_last'],
                value: 'channels_last',
              },
              keepdims: {
                type: 'boolean',
                value: false,
                inline: true,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'globalaveragepooling3d',
            name: 'GlobalAveragePooling3D Layer',
            identifier: 'globalaveragepooling3d',
            description: 'Global average pooling operation for 3D data.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              data_format: {
                type: 'select',
                options: ['channels_first', 'channels_last'],
                value: 'channels_last',
              },
              keepdims: {
                type: 'boolean',
                value: false,
                inline: true,
              },
            },
          },
        ],
      },
      {
        name: 'RECURRENT LAYERS',
        nodes: [
          {
            display: NodeDisplay.Classic,
            type: 'lstm',
            name: 'LSTM Layer',
            identifier: 'lstm',
            description: 'Long Short-Term Memory layer.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              units: {
                type: 'int',
              },
              activation: {
                type: 'select',
                options: [
                  'relu',
                  'sigmoid',
                  'softmax',
                  'softplus',
                  'softsign',
                  'tanh',
                  'selu',
                  'elu',
                  'exponential',
                  'leaky_relu',
                  'relu6',
                  'silu',
                  'hard_silu',
                  'gelu',
                  'hard_sigmoid',
                  'linear',
                  'mish',
                  'log_softmax',
                ],
                value: null,
              },
              recurrent_activation: {
                type: 'select',
                options: [
                  'relu',
                  'sigmoid',
                  'softmax',
                  'softplus',
                  'softsign',
                  'tanh',
                  'selu',
                  'elu',
                  'exponential',
                  'leaky_relu',
                  'relu6',
                  'silu',
                  'hard_silu',
                  'gelu',
                  'hard_sigmoid',
                  'linear',
                  'mish',
                  'log_softmax',
                ],
                value: null,
              },
              use_bias: {
                type: 'boolean',
                value: true,
                inline: true,
              },
              dropout: {
                type: 'float',
                value: 0,
              },
              recurrent_dropout: {
                type: 'float',
                value: 0,
              },
              return_sequences: {
                type: 'boolean',
                value: false,
                inline: true,
              },
              return_state: {
                type: 'boolean',
                value: false,
                inline: true,
              },
              go_backwards: {
                type: 'boolean',
                value: false,
                inline: true,
              },
              stateful: {
                type: 'boolean',
                value: false,
                inline: true,
              },
              unroll: {
                type: 'boolean',
                value: false,
                inline: true,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'gru',
            name: 'GRU Layer',
            identifier: 'gru',
            description: 'Gated Recurrent Unit layer.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              units: {
                type: 'int',
              },
              activation: {
                type: 'select',
                options: [
                  'relu',
                  'sigmoid',
                  'softmax',
                  'softplus',
                  'softsign',
                  'tanh',
                  'selu',
                  'elu',
                  'exponential',
                  'leaky_relu',
                  'relu6',
                  'silu',
                  'hard_silu',
                  'gelu',
                  'hard_sigmoid',
                  'linear',
                  'mish',
                  'log_softmax',
                ],
                value: null,
              },
              recurrent_activation: {
                type: 'select',
                options: [
                  'relu',
                  'sigmoid',
                  'softmax',
                  'softplus',
                  'softsign',
                  'tanh',
                  'selu',
                  'elu',
                  'exponential',
                  'leaky_relu',
                  'relu6',
                  'silu',
                  'hard_silu',
                  'gelu',
                  'hard_sigmoid',
                  'linear',
                  'mish',
                  'log_softmax',
                ],
                value: null,
              },
              use_bias: {
                type: 'boolean',
                value: true,
                inline: true,
              },
              dropout: {
                type: 'float',
                value: 0,
              },
              recurrent_dropout: {
                type: 'float',
                value: 0,
              },
              return_sequences: {
                type: 'boolean',
                value: false,
                inline: true,
              },
              return_state: {
                type: 'boolean',
                value: false,
                inline: true,
              },
              go_backwards: {
                type: 'boolean',
                value: false,
                inline: true,
              },
              stateful: {
                type: 'boolean',
                value: false,
                inline: true,
              },
              unroll: {
                type: 'boolean',
                value: false,
                inline: true,
              },
              reset_after: {
                type: 'boolean',
                value: false,
                inline: true,
              },
            },
          },
        ],
      },
      {
        name: 'PREPROCESSING LAYERS',
        nodes: [
          {
            display: NodeDisplay.Classic,
            type: 'normalization',
            name: 'Normalization Layer',
            identifier: 'normalization',
            description:
              'Scales inputs into a distribution centered around 0 with standard deviation 1.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              axis: {
                type: 'float',
                value: -1,
              },
              invert: {
                type: 'boolean',
                value: false,
                inline: true,
              },
            },
          },
        ],
      },
      {
        name: 'NORMALIZATION LAYERS',
        nodes: [
          {
            display: NodeDisplay.Classic,
            type: 'batch_normalization',
            name: 'Batch Normalization Layer',
            identifier: 'batch_normalization',
            description: 'Normalize and scale inputs or activations.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              axis: {
                type: 'float',
                value: -1,
              },
              momentum: {
                type: 'float',
                value: 0.99,
              },
              epsilon: {
                type: 'float',
                value: 0.001,
              },
              center: {
                type: 'boolean',
                value: true,
                inline: true,
              },
              scale: {
                type: 'boolean',
                value: true,
                inline: true,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'layer_normalization',
            name: 'Layer Normalization Layer',
            identifier: 'layer_normalization',
            description:
              'Normalize the activations of the previous layer for each given example in a batch independently, rather than across a batch like Batch Normalization.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              axis: {
                type: 'float',
                value: -1,
              },
              epsilon: {
                type: 'float',
                value: 0.001,
              },
              center: {
                type: 'boolean',
                value: true,
                inline: true,
              },
              scale: {
                type: 'boolean',
                value: true,
                inline: true,
              },
              rms_scaling: {
                type: 'boolean',
                value: false,
                inline: true,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'unit_normalization',
            name: 'Unit Normalization Layer',
            identifier: 'unit_normalization',
            description:
              'Normalize a batch of inputs so that each input in the batch has a L2 norm equal to 1 (across the axes specified in axis).',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              axis: {
                type: 'float',
                value: -1,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'group_normalization',
            name: 'Group Normalization Layer',
            identifier: 'group_normalization',
            description:
              'Normalize the activations of the previous layer at each step, across a batch of data.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              groups: {
                type: 'int',
                value: 1,
              },
              axis: {
                type: 'float',
                value: -1,
              },
              epsilon: {
                type: 'float',
                value: 0.001,
              },
              center: {
                type: 'boolean',
                value: true,
                inline: true,
              },
              scale: {
                type: 'boolean',
                value: true,
                inline: true,
              },
            },
          },
        ],
      },
      {
        name: 'REGULARIZATION LAYERS',
        nodes: [
          {
            display: NodeDisplay.Classic,
            type: 'dropout',
            name: 'Dropout Layer',
            identifier: 'dropout',
            description: 'Applies Dropout to the input.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              rate: {
                type: 'float',
              },
              noise_shape: {
                type: 'tuple',
                itemType: 'float',
                inline: true,
                value: null,
              },
              seed: {
                type: 'float',
                value: null,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'gaussian_dropout',
            name: 'Gaussian Dropout Layer',
            identifier: 'gaussian_dropout',
            description: 'Apply multiplicative 1-centered Gaussian noise.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              rate: {
                type: 'float',
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'alpha_dropout',
            name: 'Alpha Dropout Layer',
            identifier: 'alpha_dropout',
            description:
              'Alpha Dropout is a Dropout that keeps mean and variance of inputs to their original values, in order to ensure the self-normalizing property even after this dropout.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              rate: {
                type: 'float',
              },
              noise_shape: {
                type: 'tuple',
                itemType: 'float',
                inline: true,
                value: null,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'gaussian_noise',
            name: 'Gaussian Noise Layer',
            identifier: 'gaussian_noise',
            description: 'Apply additive zero-centered Gaussian noise.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            data: {
              stddev: {
                type: 'float',
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'activity_regularization',
            name: 'Activity Regularization Layer',
            identifier: 'activity_regularization',
            description:
              'Layer that applies an update to the cost function based on the activity.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            data: {
              l1: {
                type: 'float',
                value: 0,
              },
              l2: {
                type: 'float',
                value: 0,
              },
            },
          },
        ],
      },
      {
        name: 'ATTENTION LAYERS',
        nodes: [
          {
            display: NodeDisplay.Classic,
            type: 'multi_head_attention',
            name: 'Multi Head Attention Layer',
            identifier: 'multi_head_attention',
            description:
              'This is an implementation of multi-headed attention as described in the paper "Attention is all you Need" Vaswani et al., 2017.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              num_heads: {
                type: 'int',
              },
              key_dim: {
                type: 'int',
              },
              value_dim: {
                type: 'int',
                value: null,
              },
              dropout: {
                type: 'float',
                value: 0,
              },
              use_bias: {
                type: 'boolean',
                value: true,
                inline: true,
              },
              output_shape: {
                type: 'tuple',
                itemType: 'int',
                inline: true,
                value: null,
              },
              attention_axes: {
                type: 'tuple',
                itemType: 'int',
                inline: true,
                value: null,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'attention',
            name: 'Attention Layer',
            identifier: 'attention',
            description:
              'Dot-product attention layer, a.k.a. Luong-style attention.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              use_scale: {
                type: 'boolean',
                value: true,
                inline: true,
              },
              score_mode: {
                type: 'select',
                options: ['dot', 'concat'],
                value: 'dot',
              },
              dropout: {
                type: 'float',
                value: 0,
              },
            },
          },
        ],
      },
      {
        name: 'RESHAPING LAYERS',
        nodes: [
          {
            display: NodeDisplay.Classic,
            type: 'reshape',
            name: 'Reshape Layer',
            identifier: 'reshape',
            description: 'Layer that reshapes inputs into the given shape.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              target_shape: {
                type: 'tuple',
                itemType: 'int',
                inline: true,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'flatten',
            name: 'Flatten Layer',
            identifier: 'flatten',
            description: 'Flattens the input into a 1D array.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              data_format: {
                type: 'select',
                options: ['channels_first', 'channels_last'],
                value: 'channels_last',
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'permute',
            name: 'Permute Layer',
            identifier: 'permute',
            description:
              'Permutes the dimensions of the input according to a given pattern.',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              dims: {
                type: 'tuple',
                itemType: 'int',
                inline: true,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'zero_padding1d',
            name: 'Zero Padding 1D Layer',
            identifier: 'zero_padding1d',
            description:
              'Zero-padding layer for 1D input (e.g. temporal sequence).',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              padding: {
                type: 'tuple',
                itemType: 'int',
                inline: true,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'zero_padding2d',
            name: 'Zero Padding 2D Layer',
            identifier: 'zero_padding2d',
            description: 'Zero-padding layer for 2D input (e.g. picture).',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              padding: {
                type: 'tuple',
                itemType: 'int',
                inline: true,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'zero_padding3d',
            name: 'Zero Padding 3D Layer',
            identifier: 'zero_padding3d',
            description:
              'Zero-padding layer for 3D data (spatial or spatio-temporal).',
            inputConstraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              padding: {
                type: 'tuple',
                itemType: 'int',
                inline: true,
              },
            },
          },
        ],
      },
      {
        name: 'MERGING LAYERS',
        nodes: [
          {
            display: NodeDisplay.Classic,
            type: 'concatenate',
            name: 'Concatenate Layer',
            identifier: 'concatenate',
            description: 'Concatenates a list of inputs.',
            inputConstraints: {
              allowedCategories: ['layer'],
              min: 2,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              axis: {
                type: 'int',
                value: -1,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'average',
            name: 'Average Layer',
            identifier: 'average',
            description: 'Averages a list of inputs element-wise.',
            inputConstraints: {
              allowedCategories: ['layer'],
              min: 2,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {},
          },
          {
            display: NodeDisplay.Classic,
            type: 'maximum',
            name: 'Maximum Layer',
            identifier: 'maximum',
            description: 'Computes element-wise maximum on a list of inputs.',
            inputConstraints: {
              allowedCategories: ['layer'],
              min: 2,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {},
          },
          {
            display: NodeDisplay.Classic,
            type: 'minimum',
            name: 'Minimum Layer',
            identifier: 'minimum',
            description: 'Computes element-wise minimum on a list of inputs.',
            inputConstraints: {
              allowedCategories: ['layer'],
              min: 2,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {},
          },
          {
            display: NodeDisplay.Classic,
            type: 'add',
            name: 'Add Layer',
            identifier: 'add',
            description: 'Performs element-wise addition operation.',
            inputConstraints: {
              allowedCategories: ['layer'],
              min: 2,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {},
          },
          {
            display: NodeDisplay.Classic,
            type: 'subtract',
            name: 'Subtract Layer',
            identifier: 'subtract',
            description: 'Performs element-wise subtraction.',
            inputConstraints: {
              allowedCategories: ['layer'],
              min: 2,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {},
          },
          {
            display: NodeDisplay.Classic,
            type: 'multiply',
            name: 'Multiply Layer',
            identifier: 'multiply',
            description: 'Performs element-wise multiplication.',
            inputConstraints: {
              allowedCategories: ['layer'],
              min: 2,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {},
          },
          {
            display: NodeDisplay.Classic,
            type: 'dot',
            name: 'Dot Layer',
            identifier: 'dot',
            description: 'Computes element-wise dot product of two tensors.',
            inputConstraints: {
              allowedCategories: ['layer'],
              min: 2,
              max: 2,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              axes: {
                type: 'int',
                value: -1,
              },
              normalize: {
                type: 'boolean',
                value: false,
                inline: true,
              },
            },
          },
        ],
      },
      {
        name: 'ACTIVATION LAYERS',
        nodes: [
          {
            display: NodeDisplay.Classic,
            type: 'relu',
            name: 'ReLU Layer',
            identifier: 'relu',
            description:
              'Applies the rectified linear unit activation function.',
            inputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
              max: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              max_value: {
                type: 'float',
                value: null,
              },
              negative_slope: {
                type: 'float',
                value: 0,
              },
              threshold: {
                type: 'float',
                value: 0,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'softmax',
            name: 'Softmax Layer',
            identifier: 'softmax',
            description: 'Applies the softmax activation function.',
            inputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
              max: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              axis: {
                type: 'int',
                value: -1,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'leaky_relu',
            name: 'Leaky ReLU Layer',
            identifier: 'leaky_relu',
            description:
              'Leaky version of a Rectified Linear Unit activation layer. This layer allows a small gradient when the unit is not active.',
            inputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
              max: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              negative_slope: {
                type: 'float',
                value: 0.3,
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'prelu',
            name: 'PReLU Layer',
            identifier: 'prelu',
            description:
              'Parametric Rectified Linear Unit activation layer. It allows learnable alpha.',
            inputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
              max: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              alpha_initializer: {
                type: 'select',
                options: [
                  'zeros',
                  'ones',
                  'constant',
                  'random_normal',
                  'random_uniform',
                  'truncated_normal',
                  'variance_scaling',
                  'orthogonal',
                  'glorot_normal',
                  'glorot_uniform',
                  'he_normal',
                  'he_uniform',
                ],
                value: 'zeros',
              },
            },
          },
          {
            display: NodeDisplay.Classic,
            type: 'elu',
            name: 'ELU Layer',
            identifier: 'elu',
            description:
              'Exponential Linear Unit activation function. It follows: f(x) =  alpha * (exp(x) - 1.) for x < 0, f(x) = x for x >= 0.',
            inputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
              max: 1,
            },
            outputConstraints: {
              allowedCategories: ['layer'],
              min: 1,
            },
            data: {
              alpha: {
                type: 'float',
                value: 1,
              },
            },
          },
        ],
      },
    ],
  },
];

export const classicEdgeColors: EdgeColors = {
  dataset: '#ff5722',
  model: 'teal',
  visualizer: 'purple',
  layer: 'green',
};
