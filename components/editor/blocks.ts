enum FlowOrientation {
  INPUT = 'input',
  OUTPUT = 'output',
}

export const blocks: NodeGroupDefinition[] = [
  {
    name: 'LAYERS',
    icon: 'mdi-layers',
    color: 'green',
    group_identifier: 'layer',
    nodes: [
      {
        type: 'input_layer',
        name: 'Input Layer',
        identifier: 'input',
        description: 'Layer that accepts input data.',
        data: {
          batch_size: {
            type: 'number',
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
          },
          optional: {
            type: 'boolean',
            value: false,
          },
        },
      },
      {
        type: 'dense',
        name: 'Dense Layer',
        identifier: 'dense',
        description: 'Just your regular densely-connected NN layer.',
        data: {
          units: {
            type: 'number',
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
          },
          lora_rank: {
            type: 'number',
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
      {
        type: 'normalization',
        name: 'Normalization Layer',
        identifier: 'normalization',
        description:
          'Scales inputs into a distribution centered around 0 with standard deviation 1.',
        data: {
          axis: {
            type: 'number',
            value: -1,
          },
          invert: {
            type: 'boolean',
            value: false,
          },
        },
      },
      {
        type: 'flatten',
        name: 'Flatten Layer',
        identifier: 'flatten',
        description: 'Flattens the input into a 1D array.',
        data: {
          data_format: {
            type: 'select',
            options: ['channels_first', 'channels_last'],
            value: 'channels_last',
          },
        },
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
      {
        type: 'dropout',
        name: 'Dropout Layer',
        identifier: 'dropout',
        description: 'Applies Dropout to the input.',
        data: {
          rate: {
            type: 'number',
          },
          noise_shape: {
            type: 'tuple',
            itemType: 'number',
            value: null,
          },
          seed: {
            type: 'number',
            value: null,
          },
        },
      },
      {
        type: 'batch_normalization',
        name: 'Batch Normalization Layer',
        identifier: 'batch_normalization',
        description: 'Normalize and scale inputs or activations.',
        data: {
          axis: {
            type: 'number',
            value: -1,
          },
          momentum: {
            type: 'number',
            value: 0.99,
          },
          epsilon: {
            type: 'number',
            value: 0.001,
          },
          center: {
            type: 'boolean',
            value: true,
          },
          scale: {
            type: 'boolean',
            value: true,
          },
        },
      },
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
      {
        type: 'embedding',
        name: 'Embedding Layer',
        identifier: 'embedding',
        description:
          'Turns positive integers (indexes) into dense vectors of fixed size.',
        data: {
          input_dim: {
            type: 'number',
          },
          output_dim: {
            type: 'number',
          },
          mask_zero: {
            type: 'boolean',
            value: false,
          },
          lora_rank: {
            type: 'number',
            value: null,
          },
        },
      },
      // {
      //   type: "conv1d",
      //   name: "1D Convolution Layer",
      //   identifier: "conv1d",
      //   description: "1D convolution layer.",
      //   data: {
      //     filters: {
      //       type: "number",
      //     },
      //     kernel_size: {
      //       type: "number",
      //     },
      //     strides: {
      //       type: "number",
      //       value: 1,
      //     },
      //     padding: {
      //       type: "select",
      //       options: ["valid", "same"],
      //       value: "valid",
      //     },
      //     data_format: {
      //       type: "select",
      //       options: ["channels_first", "channels_last"],
      //       value: "channels_last",
      //     },
      //     dilation_rate: {
      //       type: "number",
      //       value: 1,
      //     },
      //     groups: {
      //       type: "number",
      //       value: 1,
      //     },
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
      //       value: null,
      //     },
      //     use_bias: {
      //       type: "boolean",
      //       value: true,
      //     },
      //   },
      // },
      // {
      //   type: "conv2d",
      //   name: "2D Convolution Layer",
      //   identifier: "conv2d",
      //   description: "2D convolution layer.",
      //   data: {
      //     filters: {
      //       type: "number",
      //     },
      //     kernel_size: {
      //       type: "tuple",
      //       itemType: "number",
      //     },
      //     strides: {
      //       type: "tuple",
      //       itemType: "number",
      //       value: [1, 1],
      //     },
      //     padding: {
      //       type: "select",
      //       options: ["valid", "same"],
      //       value: "valid",
      //     },
      //     data_format: {
      //       type: "select",
      //       options: ["channels_first", "channels_last"],
      //       value: "channels_last",
      //     },
      //     dilation_rate: {
      //       type: "tuple",
      //       itemType: "number",
      //       value: [1, 1],
      //     },
      //     groups: {
      //       type: "number",
      //       value: 1,
      //     },
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
      //       value: null,
      //     },
      //     use_bias: {
      //       type: "boolean",
      //       value: true,
      //     },
      //   },
      // },
      // {
      //   type: "conv3d",
      //   name: "3D Convolution Layer",
      //   identifier: "conv3d",
      //   description: "3D convolution layer.",
      //   data: {
      //     filters: {
      //       type: "number",
      //     },
      //     kernel_size: {
      //       type: "tuple",
      //       itemType: "number",
      //     },
      //     strides: {
      //       type: "tuple",
      //       itemType: "number",
      //       value: [1, 1, 1],
      //     },
      //     padding: {
      //       type: "select",
      //       options: ["valid", "same"],
      //       value: "valid",
      //     },
      //     data_format: {
      //       type: "select",
      //       options: ["channels_first", "channels_last"],
      //       value: "channels_last",
      //     },
      //     dilation_rate: {
      //       type: "tuple",
      //       itemType: "number",
      //       value: [1, 1, 1],
      //     },
      //     groups: {
      //       type: "number",
      //       value: 1,
      //     },
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
      //       value: null,
      //     },
      //     use_bias: {
      //       type: "boolean",
      //       value: true,
      //     },
      //   },
      // },
      // {
      //   type: "maxpooling1d",
      //   name: "MaxPooling1D Layer",
      //   identifier: "maxpooling1d",
      //   description: "Max pooling operation for 1D temporal data.",
      //   data: {
      //     pool_size: {
      //       type: "number",
      //     },
      //     strides: {
      //       type: "number",
      //       value: null,
      //     },
      //     padding: {
      //       type: "select",
      //       options: ["valid", "same"],
      //       value: "valid",
      //     },
      //     data_format: {
      //       type: "select",
      //       options: ["channels_first", "channels_last"],
      //       value: "channels_last",
      //     },
      //   },
      // },
      // {
      //   type: "maxpooling2d",
      //   name: "MaxPooling2D Layer",
      //   identifier: "maxpooling2d",
      //   description: "Max pooling operation for 2D spatial data.",
      //   data: {
      //     pool_size: {
      //       type: "tuple",
      //       itemType: "number",
      //       value: [2, 2],
      //     },
      //     strides: {
      //       type: "tuple",
      //       itemType: "number",
      //       value: null,
      //     },
      //     padding: {
      //       type: "select",
      //       options: ["valid", "same"],
      //       value: "valid",
      //     },
      //     data_format: {
      //       type: "select",
      //       options: ["channels_first", "channels_last"],
      //       value: "channels_last",
      //     },
      //   },
      // },
      // {
      //   type: "maxpooling3d",
      //   name: "MaxPooling3D Layer",
      //   identifier: "maxpooling3d",
      //   description: "Max pooling operation for 3D data.",
      //   data: {
      //     pool_size: {
      //       type: "tuple",
      //       itemType: "number",
      //     },
      //     strides: {
      //       type: "tuple",
      //       itemType: "number",
      //       value: null,
      //     },
      //     padding: {
      //       type: "select",
      //       options: ["valid", "same"],
      //       value: "valid",
      //     },
      //     data_format: {
      //       type: "select",
      //       options: ["channels_first", "channels_last"],
      //       value: "channels_last",
      //     },
      //   },
      // },
      // {
      //   type: "averagepooling1d",
      //   name: "AveragePooling1D Layer",
      //   identifier: "averagepooling1d",
      //   description: "Average pooling operation for temporal data.",
      //   data: {
      //     pool_size: {
      //       type: "number",
      //     },
      //     strides: {
      //       type: "number",
      //       value: null,
      //     },
      //     padding: {
      //       type: "select",
      //       options: ["valid", "same"],
      //       value: "valid",
      //     },
      //     data_format: {
      //       type: "select",
      //       options: ["channels_first", "channels_last"],
      //       value: "channels_last",
      //     },
      //   },
      // },
      // {
      //   type: "averagepooling2d",
      //   name: "AveragePooling2D Layer",
      //   identifier: "averagepooling2d",
      //   description: "Average pooling operation for spatial data.",
      //   data: {
      //     pool_size: {
      //       type: "tuple",
      //       itemType: "number",
      //       value: [2, 2],
      //     },
      //     strides: {
      //       type: "tuple",
      //       itemType: "number",
      //       value: null,
      //     },
      //     padding: {
      //       type: "select",
      //       options: ["valid", "same"],
      //       value: "valid",
      //     },
      //     data_format: {
      //       type: "select",
      //       options: ["channels_first", "channels_last"],
      //       value: "channels_last",
      //     },
      //   },
      // },
      // {
      //   type: "averagepooling3d",
      //   name: "AveragePooling3D Layer",
      //   identifier: "averagepooling3d",
      //   description: "Average pooling operation for 3D data.",
      //   data: {
      //     pool_size: {
      //       type: "tuple",
      //       itemType: "number",
      //     },
      //     strides: {
      //       type: "tuple",
      //       itemType: "number",
      //       value: null,
      //     },
      //     padding: {
      //       type: "select",
      //       options: ["valid", "same"],
      //       value: "valid",
      //     },
      //     data_format: {
      //       type: "select",
      //       options: ["channels_first", "channels_last"],
      //       value: "channels_last",
      //     },
      //   },
      // },
      // {
      //   type: "globalmaxpooling1d",
      //   name: "GlobalMaxPooling1D Layer",
      //   identifier: "globalmaxpooling1d",
      //   description: "Global max pooling operation for temporal data.",
      //   data: {
      //     data_format: {
      //       type: "select",
      //       options: ["channels_first", "channels_last"],
      //       value: "channels_last",
      //     },
      //     keepdims: {
      //       type: "boolean",
      //       value: false,
      //     },
      //   },
      // },
      // {
      //   type: "globalmaxpooling2d",
      //   name: "GlobalMaxPooling2D Layer",
      //   identifier: "globalmaxpooling2d",
      //   description: "Global max pooling operation for 2D data.",
      //   data: {
      //     data_format: {
      //       type: "select",
      //       options: ["channels_first", "channels_last"],
      //       value: "channels_last",
      //     },
      //     keepdims: {
      //       type: "boolean",
      //       value: false,
      //     },
      //   },
      // },
      // {
      //   type: "globalmaxpooling3d",
      //   name: "GlobalMaxPooling3D Layer",
      //   identifier: "globalmaxpooling3d",
      //   description: "Global max pooling operation for 3D data.",
      //   data: {
      //     data_format: {
      //       type: "select",
      //       options: ["channels_first", "channels_last"],
      //       value: "channels_last",
      //     },
      //     keepdims: {
      //       type: "boolean",
      //       value: false,
      //     },
      //   },
      // },
      // {
      //   type: "globalaveragepooling1d",
      //   name: "GlobalAveragePooling1D layer",
      //   identifier: "globalaveragepooling1d",
      //   description: "Global average pooling operation for temporal data.",
      //   data: {
      //     data_format: {
      //       type: "select",
      //       options: ["channels_first", "channels_last"],
      //       value: "channels_last",
      //     },
      //     keepdims: {
      //       type: "boolean",
      //       value: false,
      //     },
      //   },
      // },
      // {
      //   type: "globalaveragepooling2d",
      //   name: "GlobalAveragePooling2D Layer",
      //   identifier: "globalaveragepooling2d",
      //   description: "Global average pooling operation for 2D data.",
      //   data: {
      //     data_format: {
      //       type: "select",
      //       options: ["channels_first", "channels_last"],
      //       value: "channels_last",
      //     },
      //     keepdims: {
      //       type: "boolean",
      //       value: false,
      //     },
      //   },
      // },
      // {
      //   type: "globalaveragepooling3d",
      //   name: "GlobalAveragePooling3D Layer",
      //   identifier: "globalaveragepooling3d",
      //   description: "Global average pooling operation for 3D data.",
      //   data: {
      //     data_format: {
      //       type: "select",
      //       options: ["channels_first", "channels_last"],
      //       value: "channels_last",
      //     },
      //     keepdims: {
      //       type: "boolean",
      //       value: false,
      //     },
      //   },
      // },
    ],
  },
  {
    name: 'DATASETS',
    icon: 'mdi-database',
    color: '#ff5722',
    group_identifier: 'dataset',
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
            type: 'number',
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
            type: 'number',
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
        data: {
          ratio: {
            type: 'number',
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
  {
    name: 'MODELS',
    icon: 'mdi-cube',
    color: 'teal',
    group_identifier: 'model',
    nodes: [
      {
        type: 'Model',
        name: 'Model',
        description: 'Create and compile a new model.',
        identifier: 'Model',
        hideInput: true,
        data: {
          inputs: {
            type: 'id',
            flowOrientation: FlowOrientation.OUTPUT,
            required: true,
            constraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
          },
          outputs: {
            type: 'id',
            flowOrientation: FlowOrientation.INPUT,
            required: true,
            constraints: {
              allowedCategories: ['layer'],
              max: 1,
              min: 1,
            },
          },
          visualizers: {
            type: 'id',
            flowOrientation: FlowOrientation.OUTPUT,
            constraints: {
              allowedCategories: ['visualizer'],
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
      // {
      //   type: "compile",
      //   name: "compile",
      //   description: "Compile the model.",
      //   identifier: "compile",
      //   data: {
      //     optimizer: {
      //       type: "select",
      //       options: [
      //         "sgd",
      //         "rmsprop",
      //         "adam",
      //         "adadelta",
      //         "adagrad",
      //         "adamax",
      //         "nadam",
      //         "ftrl",
      //       ],
      //       value: "adam",
      //     },
      //     loss: {
      //       type: "select",
      //       options: [
      //         "mean_squared_error",
      //         "mean_absolute_error",
      //         "mean_absolute_percentage_error",
      //         "mean_squared_logarithmic_error",
      //         "squared_hinge",
      //         "hinge",
      //         "categorical_hinge",
      //         "logcosh",
      //         "huber",
      //         "categorical_crossentropy",
      //         "sparse_categorical_crossentropy",
      //         "binary_crossentropy",
      //         "kullback_leibler_divergence",
      //         "poisson",
      //         "cosine_similarity",
      //         "mean_squared_error",
      //         "mean_absolute_error",
      //         "mean_absolute_percentage_error",
      //         "mean_squared_logarithmic_error",
      //         "squared_hinge",
      //         "hinge",
      //         "categorical_hinge",
      //         "logcosh",
      //         "huber",
      //         "categorical_crossentropy",
      //         "sparse_categorical_crossentropy",
      //         "binary_crossentropy",
      //         "kullback_leibler_divergence",
      //         "poisson",
      //         "cosine_similarity",
      //       ],
      //       value: "categorical_crossentropy",
      //     },
      //     metrics: {
      //       type: "multiselect",
      //       options: [
      //         "accuracy",
      //         "binary_accuracy",
      //         "categorical_accuracy",
      //         "top_k_categorical_accuracy",
      //         "sparse_top_k_categorical_accuracy",
      //         "sparse_categorical_accuracy",
      //         "cosine_similarity",
      //         "mean_absolute_error",
      //         "mean_absolute_percentage_error",
      //         "mean_squared_error",
      //         "mean_squared_logarithmic_error",
      //         "logcosh",
      //         "hinge",
      //         "squared_hinge",
      //         "categorical_hinge",
      //         "kullback_leibler_divergence",
      //         "poisson",
      //         "cosine_proximity",
      //       ],
      //       value: ["accuracy"],
      //     },
      //     name: {
      //       type: "string",
      //       value: "model",
      //     },
      //   },
      // },
      {
        type: 'fit',
        name: 'fit',
        description: 'Fit the model.',
        identifier: 'fit',
        data: {
          x: {
            type: 'id',
            flowOrientation: FlowOrientation.INPUT,
            constraints: {
              allowedCategories: ['dataset'],
              max: 1,
              min: 1,
            },
          },
          epochs: {
            type: 'number',
            value: 1,
          },
          early_stopping: {
            type: 'number',
            value: null,
          },
          validation_data: {
            type: 'id',
            flowOrientation: FlowOrientation.INPUT,
            constraints: {
              allowedCategories: ['dataset'],
              max: 1,
            },
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
        data: {
          x: {
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
    ],
  },
  {
    name: 'VISUALIZER',
    icon: 'mdi-chart-line',
    color: 'purple',
    group_identifier: 'visualizer',
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
];

export type NodeGroupDefinition = {
  name: string;
  icon: string;
  color: string;
  group_identifier: string;
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
        type: 'number';
        value?: number | null;
      }
    | {
        type: 'boolean';
        value?: boolean | null;
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
  >;
};
