export const blocks = [
  {
    "name": "layer",
    "icon": "mdi-test-tube",
    "color": "green",
    "group_identifier": "layer",
    "nodes": [
      {
        "type": "input_layer",
        "name": "Input Layer",
        "identifier": "input",
        "description": "Layer that accepts input data.",
        "data": {
          "shape": {
            "type": "tuple",
            "itemType": "number",
            "value": [0]
          },
          "batch_size": {
            "type": "number",
            "value": null
          },
          "dtype": {
            "type": "select",
            "options": [
              "float32",
              "float64",
              "int32",
              "uint8",
              "int16",
              "int8",
              "int64",
              "complex64",
              "complex128",
              "bool",
              "string"
            ],
            "value": "float32"
          },
          "sparse": {
            "type": "boolean",
            "value": false
          },
          "optional": {
            "type": "boolean",
            "value": false
          }
        }
      },
      {
        "type": "dense",
        "name": "Dense Layer",
        "identifier": "dense",
        "description": "Just your regular densely-connected NN layer.",
        "data": {
          "units": {
            "type": "number"
          },
          "activation": {
            "type": "select",
            "options": [
              "relu",
              "sigmoid",
              "tanh",
              "softmax",
              "softplus",
              "softsign",
              "selu",
              "elu",
              "exponential",
              "linear"
            ],
            "value": "relu"
          },
          "use_bias": {
            "type": "boolean",
            "value": true
          },
          "lora_rank": {
            "type": "number",
            "value": null
          }
        }
      },
      {
        "type": "flatten",
        "name": "Flatten Layer",
        "identifier": "flatten",
        "description": "Flattens the input into a 1D array.",
        "data": {
          "data_format": {
            "type": "select",
            "options": [
              "channels_first",
              "channels_last"
            ],
            "value": "channels_last"
          }
        }
      }
    ]
  },
  {
    "name": "dataset",
    "icon": "mdi-database",
    "color": "blue",
    "group_identifier": "dataset",
    "nodes": [
      {
        "type": "load",
        "name": "Load Dataset",
        "description": "Load a common dataset.",
        "identifier": "load",
        "data": {
          "name": {
            "type": "select",
            "options": [
              "mnist",
              "fashion_mnist",
              "cifar10",
              "cifar100",
              "imdb",
              "reuters",
              "boston_housing"
            ]
          },
          "split": {
            "type": "string",
            "value": "train"
          },
          "batch_size": {
            "type": "number",
            "value": 32
          }
        }
      }
    ]
  },
  {
    "name": "model",
    "icon": "mdi-cube",
    "color": "teal",
    "group_identifier": "model",
    "nodes": [
      {
        "type": "create",
        "name": "create",
        "description": "Create a model.",
        "identifier": "create",
        "data": {
          "inputs": {
            "type": "id",
          },
          "outputs": {
            "type": "id",
          },
          "name": {
            "type": "string",
            "value": "model"
          }
        }
      },
      {
        "type": "compile",
        "name": "compile",
        "description": "Compile the model.",
        "identifier": "compile",
        "data": {
          "optimizer": {
            "type": "select",
            "options": [
              "sgd",
              "rmsprop",
              "adam",
              "adadelta",
              "adagrad",
              "adamax",
              "nadam",
              "ftrl"
            ],
            "value": "adam"
          },
          "loss": {
            "type": "select",
            "options": [
              "mean_squared_error",
              "mean_absolute_error",
              "mean_absolute_percentage_error",
              "mean_squared_logarithmic_error",
              "squared_hinge",
              "hinge",
              "categorical_hinge",
              "logcosh",
              "huber",
              "categorical_crossentropy",
              "sparse_categorical_crossentropy",
              "binary_crossentropy",
              "kullback_leibler_divergence",
              "poisson",
              "cosine_similarity",
              "mean_squared_error",
              "mean_absolute_error",
              "mean_absolute_percentage_error",
              "mean_squared_logarithmic_error",
              "squared_hinge",
              "hinge",
              "categorical_hinge",
              "logcosh",
              "huber",
              "categorical_crossentropy",
              "sparse_categorical_crossentropy",
              "binary_crossentropy",
              "kullback_leibler_divergence",
              "poisson",
              "cosine_similarity"
            ],
            "value": "categorical_crossentropy"
          },
          "metrics": {
            "type": "multiselect",
            "options": [
              "accuracy",
              "binary_accuracy",
              "categorical_accuracy",
              "top_k_categorical_accuracy",
              "sparse_top_k_categorical_accuracy",
              "sparse_categorical_accuracy",
              "cosine_similarity",
              "mean_absolute_error",
              "mean_absolute_percentage_error",
              "mean_squared_error",
              "mean_squared_logarithmic_error",
              "logcosh",
              "hinge",
              "squared_hinge",
              "categorical_hinge",
              "kullback_leibler_divergence",
              "poisson",
              "cosine_proximity"
            ],
            "value": ["accuracy"]
          },
          "name": {
            "type": "string",
            "value": "model"
          }
        }
      },
      {
        "type": "fit",
        "name": "fit",
        "description": "Fit the model.",
        "identifier": "fit",
        "data": {
          "x": {
            "type": "id",
          },
          "epochs": {
            "type": "number",
            "value": 1
          },
          "validation_data": {
            "type": "id",
          },
          "name": {
            "type": "string",
            "value": "model"
          }
        }
      },
      {
        "type": "evaluate",
        "name": "evaluate",
        "description": "Evaluate the model.",
        "identifier": "evaluate",
        "data": {
          "x": {
            "type": "id",
          },
          "name": {
            "type": "string",
            "value": "model"
          }
        }
      }
    ]
  }
]
