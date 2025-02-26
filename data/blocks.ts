export enum FlowOrientation {
  INPUT = 'input',
  OUTPUT = 'output',
}

export const blocks: NodeGroupDefinition[] = [
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
              name: {
                type: 'string',
                value: 'model',
              },
            },
          },
          {
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
              name: {
                type: 'string',
                value: 'model',
              },
            },
          },
          {
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
              name: {
                type: 'string',
                value: 'model',
              },
            },
          },
          {
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
              name: {
                type: 'string',
                value: 'model',
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
              max: 1,
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
              max: 1,
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
              max: 1,
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
          // {
          //   type: "activation",
          //   name: "Activation Layer",
          //   identifier: "activation",
          //   description: "Applies an activation function to an output.",
          //   data: {
          //     activation: {
          //       type: "select",
          //       options: [
          //         "relu",
          //         "sigmoid",
          //         "softmax",
          //         "softplus",
          //         "softsign",
          //         "tanh",
          //         "selu",
          //         "elu",
          //         "exponential",
          //         "leaky_relu",
          //         "relu6",
          //         "silu",
          //         "hard_silu",
          //         "gelu",
          //         "hard_sigmoid",
          //         "linear",
          //         "mish",
          //         "log_softmax",
          //       ],
          //     },
          //   },
          // },
        ],
      },
      // {
      //   name: 'CONVOLUTION LAYERS',
      //   nodes: [
      //     // {
      //               //   type: "conv1d",
      //               //   name: "1D Convolution Layer",
      //               //   identifier: "conv1d",
      //               //   description: "1D convolution layer.",
      //               //   data: {
      //               //     filters: {
      //               //       type: "number",
      //               //     },
      //               //     kernel_size: {
      //               //       type: "number",
      //               //     },
      //               //     strides: {
      //               //       type: "number",
      //               //       value: 1,
      //               //     },
      //               //     padding: {
      //               //       type: "select",
      //               //       options: ["valid", "same"],
      //               //       value: "valid",
      //               //     },
      //               //     data_format: {
      //               //       type: "select",
      //               //       options: ["channels_first", "channels_last"],
      //               //       value: "channels_last",
      //               //     },
      //               //     dilation_rate: {
      //               //       type: "number",
      //               //       value: 1,
      //               //     },
      //               //     groups: {
      //               //       type: "number",
      //               //       value: 1,
      //               //     },
      //               //     activation: {
      //               //       type: "select",
      //               //       options: [
      //               //         "relu",
      //               //         "sigmoid",
      //               //         "softmax",
      //               //         "softplus",
      //               //         "softsign",
      //               //         "tanh",
      //               //         "selu",
      //               //         "elu",
      //               //         "exponential",
      //               //         "leaky_relu",
      //               //         "relu6",
      //               //         "silu",
      //               //         "hard_silu",
      //               //         "gelu",
      //               //         "hard_sigmoid",
      //               //         "linear",
      //               //         "mish",
      //               //         "log_softmax",
      //               //       ],
      //               //       value: null,
      //               //     },
      //               //     use_bias: {
      //               //       type: "boolean",
      //               //       value: true,
      //               //     },
      //               //   },
      //               // },
      //               // {
      //               //   type: "conv2d",
      //               //   name: "2D Convolution Layer",
      //               //   identifier: "conv2d",
      //               //   description: "2D convolution layer.",
      //               //   data: {
      //               //     filters: {
      //               //       type: "number",
      //               //     },
      //               //     kernel_size: {
      //               //       type: "tuple",
      //               //       itemType: "number",
      //               //     },
      //               //     strides: {
      //               //       type: "tuple",
      //               //       itemType: "number",
      //               //       value: [1, 1],
      //               //     },
      //               //     padding: {
      //               //       type: "select",
      //               //       options: ["valid", "same"],
      //               //       value: "valid",
      //               //     },
      //               //     data_format: {
      //               //       type: "select",
      //               //       options: ["channels_first", "channels_last"],
      //               //       value: "channels_last",
      //               //     },
      //               //     dilation_rate: {
      //               //       type: "tuple",
      //               //       itemType: "number",
      //               //       value: [1, 1],
      //               //     },
      //               //     groups: {
      //               //       type: "number",
      //               //       value: 1,
      //               //     },
      //               //     activation: {
      //               //       type: "select",
      //               //       options: [
      //               //         "relu",
      //               //         "sigmoid",
      //               //         "softmax",
      //               //         "softplus",
      //               //         "softsign",
      //               //         "tanh",
      //               //         "selu",
      //               //         "elu",
      //               //         "exponential",
      //               //         "leaky_relu",
      //               //         "relu6",
      //               //         "silu",
      //               //         "hard_silu",
      //               //         "gelu",
      //               //         "hard_sigmoid",
      //               //         "linear",
      //               //         "mish",
      //               //         "log_softmax",
      //               //       ],
      //               //       value: null,
      //               //     },
      //               //     use_bias: {
      //               //       type: "boolean",
      //               //       value: true,
      //               //     },
      //               //   },
      //               // },
      //               // {
      //               //   type: "conv3d",
      //               //   name: "3D Convolution Layer",
      //               //   identifier: "conv3d",
      //               //   description: "3D convolution layer.",
      //               //   data: {
      //               //     filters: {
      //               //       type: "number",
      //               //     },
      //               //     kernel_size: {
      //               //       type: "tuple",
      //               //       itemType: "number",
      //               //     },
      //               //     strides: {
      //               //       type: "tuple",
      //               //       itemType: "number",
      //               //       value: [1, 1, 1],
      //               //     },
      //               //     padding: {
      //               //       type: "select",
      //               //       options: ["valid", "same"],
      //               //       value: "valid",
      //               //     },
      //               //     data_format: {
      //               //       type: "select",
      //               //       options: ["channels_first", "channels_last"],
      //               //       value: "channels_last",
      //               //     },
      //               //     dilation_rate: {
      //               //       type: "tuple",
      //               //       itemType: "number",
      //               //       value: [1, 1, 1],
      //               //     },
      //               //     groups: {
      //               //       type: "number",
      //               //       value: 1,
      //               //     },
      //               //     activation: {
      //               //       type: "select",
      //               //       options: [
      //               //         "relu",
      //               //         "sigmoid",
      //               //         "softmax",
      //               //         "softplus",
      //               //         "softsign",
      //               //         "tanh",
      //               //         "selu",
      //               //         "elu",
      //               //         "exponential",
      //               //         "leaky_relu",
      //               //         "relu6",
      //               //         "silu",
      //               //         "hard_silu",
      //               //         "gelu",
      //               //         "hard_sigmoid",
      //               //         "linear",
      //               //         "mish",
      //               //         "log_softmax",
      //               //       ],
      //               //       value: null,
      //               //     },
      //               //     use_bias: {
      //               //       type: "boolean",
      //               //       value: true,
      //               //     },
      //               //   },
      //               // },
      //               // {
      //               //   type: "maxpooling1d",
      //               //   name: "MaxPooling1D Layer",
      //               //   identifier: "maxpooling1d",
      //               //   description: "Max pooling operation for 1D temporal data.",
      //               //   data: {
      //               //     pool_size: {
      //               //       type: "number",
      //               //     },
      //               //     strides: {
      //               //       type: "number",
      //               //       value: null,
      //               //     },
      //               //     padding: {
      //               //       type: "select",
      //               //       options: ["valid", "same"],
      //               //       value: "valid",
      //               //     },
      //               //     data_format: {
      //               //       type: "select",
      //               //       options: ["channels_first", "channels_last"],
      //               //       value: "channels_last",
      //               //     },
      //               //   },
      //               // },
      //               // {
      //               //   type: "maxpooling2d",
      //               //   name: "MaxPooling2D Layer",
      //               //   identifier: "maxpooling2d",
      //               //   description: "Max pooling operation for 2D spatial data.",
      //               //   data: {
      //               //     pool_size: {
      //               //       type: "tuple",
      //               //       itemType: "number",
      //               //       value: [2, 2],
      //               //     },
      //               //     strides: {
      //               //       type: "tuple",
      //               //       itemType: "number",
      //               //       value: null,
      //               //     },
      //               //     padding: {
      //               //       type: "select",
      //               //       options: ["valid", "same"],
      //               //       value: "valid",
      //               //     },
      //               //     data_format: {
      //               //       type: "select",
      //               //       options: ["channels_first", "channels_last"],
      //               //       value: "channels_last",
      //               //     },
      //               //   },
      //               // },
      //               // {
      //               //   type: "maxpooling3d",
      //               //   name: "MaxPooling3D Layer",
      //               //   identifier: "maxpooling3d",
      //               //   description: "Max pooling operation for 3D data.",
      //               //   data: {
      //               //     pool_size: {
      //               //       type: "tuple",
      //               //       itemType: "number",
      //               //     },
      //               //     strides: {
      //               //       type: "tuple",
      //               //       itemType: "number",
      //               //       value: null,
      //               //     },
      //               //     padding: {
      //               //       type: "select",
      //               //       options: ["valid", "same"],
      //               //       value: "valid",
      //               //     },
      //               //     data_format: {
      //               //       type: "select",
      //               //       options: ["channels_first", "channels_last"],
      //               //       value: "channels_last",
      //               //     },
      //               //   },
      //               // },
      //               // {
      //               //   type: "averagepooling1d",
      //               //   name: "AveragePooling1D Layer",
      //               //   identifier: "averagepooling1d",
      //               //   description: "Average pooling operation for temporal data.",
      //               //   data: {
      //               //     pool_size: {
      //               //       type: "number",
      //               //     },
      //               //     strides: {
      //               //       type: "number",
      //               //       value: null,
      //               //     },
      //               //     padding: {
      //               //       type: "select",
      //               //       options: ["valid", "same"],
      //               //       value: "valid",
      //               //     },
      //               //     data_format: {
      //               //       type: "select",
      //               //       options: ["channels_first", "channels_last"],
      //               //       value: "channels_last",
      //               //     },
      //               //   },
      //               // },
      //               // {
      //               //   type: "averagepooling2d",
      //               //   name: "AveragePooling2D Layer",
      //               //   identifier: "averagepooling2d",
      //               //   description: "Average pooling operation for spatial data.",
      //               //   data: {
      //               //     pool_size: {
      //               //       type: "tuple",
      //               //       itemType: "number",
      //               //       value: [2, 2],
      //               //     },
      //               //     strides: {
      //               //       type: "tuple",
      //               //       itemType: "number",
      //               //       value: null,
      //               //     },
      //               //     padding: {
      //               //       type: "select",
      //               //       options: ["valid", "same"],
      //               //       value: "valid",
      //               //     },
      //               //     data_format: {
      //               //       type: "select",
      //               //       options: ["channels_first", "channels_last"],
      //               //       value: "channels_last",
      //               //     },
      //               //   },
      //               // },
      //               // {
      //               //   type: "averagepooling3d",
      //               //   name: "AveragePooling3D Layer",
      //               //   identifier: "averagepooling3d",
      //               //   description: "Average pooling operation for 3D data.",
      //               //   data: {
      //               //     pool_size: {
      //               //       type: "tuple",
      //               //       itemType: "number",
      //               //     },
      //               //     strides: {
      //               //       type: "tuple",
      //               //       itemType: "number",
      //               //       value: null,
      //               //     },
      //               //     padding: {
      //               //       type: "select",
      //               //       options: ["valid", "same"],
      //               //       value: "valid",
      //               //     },
      //               //     data_format: {
      //               //       type: "select",
      //               //       options: ["channels_first", "channels_last"],
      //               //       value: "channels_last",
      //               //     },
      //               //   },
      //               // },
      //               // {
      //               //   type: "globalmaxpooling1d",
      //               //   name: "GlobalMaxPooling1D Layer",
      //               //   identifier: "globalmaxpooling1d",
      //               //   description: "Global max pooling operation for temporal data.",
      //               //   data: {
      //               //     data_format: {
      //               //       type: "select",
      //               //       options: ["channels_first", "channels_last"],
      //               //       value: "channels_last",
      //               //     },
      //               //     keepdims: {
      //               //       type: "boolean",
      //               //       value: false,
      //               //     },
      //               //   },
      //               // },
      //               // {
      //               //   type: "globalmaxpooling2d",
      //               //   name: "GlobalMaxPooling2D Layer",
      //               //   identifier: "globalmaxpooling2d",
      //               //   description: "Global max pooling operation for 2D data.",
      //               //   data: {
      //               //     data_format: {
      //               //       type: "select",
      //               //       options: ["channels_first", "channels_last"],
      //               //       value: "channels_last",
      //               //     },
      //               //     keepdims: {
      //               //       type: "boolean",
      //               //       value: false,
      //               //     },
      //               //   },
      //               // },
      //               // {
      //               //   type: "globalmaxpooling3d",
      //               //   name: "GlobalMaxPooling3D Layer",
      //               //   identifier: "globalmaxpooling3d",
      //               //   description: "Global max pooling operation for 3D data.",
      //               //   data: {
      //               //     data_format: {
      //               //       type: "select",
      //               //       options: ["channels_first", "channels_last"],
      //               //       value: "channels_last",
      //               //     },
      //               //     keepdims: {
      //               //       type: "boolean",
      //               //       value: false,
      //               //     },
      //               //   },
      //               // },
      //               // {
      //               //   type: "globalaveragepooling1d",
      //               //   name: "GlobalAveragePooling1D layer",
      //               //   identifier: "globalaveragepooling1d",
      //               //   description: "Global average pooling operation for temporal data.",
      //               //   data: {
      //               //     data_format: {
      //               //       type: "select",
      //               //       options: ["channels_first", "channels_last"],
      //               //       value: "channels_last",
      //               //     },
      //               //     keepdims: {
      //               //       type: "boolean",
      //               //       value: false,
      //               //     },
      //               //   },
      //               // },
      //               // {
      //               //   type: "globalaveragepooling2d",
      //               //   name: "GlobalAveragePooling2D Layer",
      //               //   identifier: "globalaveragepooling2d",
      //               //   description: "Global average pooling operation for 2D data.",
      //               //   data: {
      //               //     data_format: {
      //               //       type: "select",
      //               //       options: ["channels_first", "channels_last"],
      //               //       value: "channels_last",
      //               //     },
      //               //     keepdims: {
      //               //       type: "boolean",
      //               //       value: false,
      //               //     },
      //               //   },
      //               // },
      //               // {
      //               //   type: "globalaveragepooling3d",
      //               //   name: "GlobalAveragePooling3D Layer",
      //               //   identifier: "globalaveragepooling3d",
      //               //   description: "Global average pooling operation for 3D data.",
      //               //   data: {
      //               //     data_format: {
      //               //       type: "select",
      //               //       options: ["channels_first", "channels_last"],
      //               //       value: "channels_last",
      //               //     },
      //               //     keepdims: {
      //               //       type: "boolean",
      //               //       value: false,
      //               //     },
      //               //   },
      //               // },
      //   ]
      // },
      // {
      //   name: 'POOLING LAYERS',
      //   nodes: [
      //
      //   ]
      // },
      // {
      //   name: 'RECURRENT LAYERS',
      //   nodes: [
      //
      //   ]
      // },
      {
        name: 'PREPROCESSING LAYERS',
        nodes: [
          {
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
              max: 1,
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
              max: 1,
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
        ],
      },
      {
        name: 'REGULARIZATION LAYERS',
        nodes: [
          {
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
              max: 1,
              min: 1,
            },
            data: {
              rate: {
                type: 'float',
              },
              noise_shape: {
                type: 'tuple',
                itemType: 'number',
                value: null,
              },
              seed: {
                type: 'float',
                value: null,
              },
            },
          },
        ],
      },
      // {
      //   name: 'ATTENTION LAYERS',
      //   nodes: [
      //
      //   ]
      // },
      {
        name: 'RESHAPING LAYERS',
        nodes: [
          {
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
              max: 1,
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
        ],
      },

      // {
      //   type: "ReLU",
      //   name: "ReLU Layer",
      //   identifier: "relu",
      //   description: "Applies the rectified linear unit activation function.",
      //   data: {
      //     max_value: {
      //       type: "number",
      //       value: null,
      //     },
      //     negative_slope: {
      //       type: "number",
      //       value: 0,
      //     },
      //     threshold: {
      //       type: "number",
      //       value: 0,
      //     },
      //   },
      // },

      // {
      //   type: "reshape",
      //   name: "Reshape Layer",
      //   identifier: "reshape",
      //   description: "Reshapes an output to a certain shape.",
      //   data: {
      //     target_shape: {
      //       type: "tuple",
      //       itemType: "number",
      //     },
      //   },
      // },
      // {
      //   type: "average",
      //   name: "Average Layer",
      //   identifier: "average",
      //   description: "Averages a list of input element-wise.",
      //   data: {},
      // },

      // { name: 'G2', nodes: [] },
      // { name: 'G3', nodes: [] },
    ],
  },
];

export type NodeGroupDefinition = {
  name: string;
  icon: string;
  color: string;
  group_identifier: string;
  default_width?: number;
  groups: NodeSubGroupDefinition[];
};

export type NodeSubGroupDefinition = {
  name: string;
  icon?: string;
  color?: string;
  nodes: NodeDefinition[];
};

export type NodeConnectionConstraint = {
  allowedCategories?: string[];
  min?: number;
  max?: number;
};

export type NodeDefinition = {
  type: string;
  name: string;
  description: string;
  identifier: string;
  minSize?: { width: number; height: number };
  hideInput?: boolean;
  hideOutput?: boolean;
  inputConstraints?: NodeConnectionConstraint;
  outputConstraints?: NodeConnectionConstraint;
  data: Record<
    string,
    | {
        type: 'id';
        flowOrientation: FlowOrientation;
        invertPosition?: boolean;
        constraints?: NodeConnectionConstraint;
        required?: boolean;
        rules?: any[];
      }
    | {
        type: 'select';
        options: string[];
        value?: string | null;
      }
    | {
        type: 'float';
        value?: number | null;
        min?: number;
        max?: number;
        step?: number;
      }
    | {
        type: 'int';
        value?: number | null;
        min?: number;
        max?: number;
        step?: number;
      }
    | {
        type: 'boolean';
        value?: boolean | null;
        inline: boolean | undefined;
      }
    | {
        type: 'tuple';
        itemType: 'number' | 'string';
        value?: string[] | null;
      }
    | {
        type: 'multiselect';
        options: string[];
        value?: string[] | null;
      }
    | {
        type: 'string';
        value?: string | null;
      }
    | {
        type: 'range';
        min: number;
        max: number;
        step: number;
        value?: number | null;
        inline: boolean | undefined;
      }
  >;
};
