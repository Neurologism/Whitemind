// Mock data for datasets available for training and testing
// in future this should be server side data and server side stored

export const datasets: datasetDefinition[] = [
  {
    name: 'MNIST Handwritten Digits',
    description: 'Images of handwritten digits for classification',
    identifier: 'mnist',
    url: null,
    numberOfRecords: 70000,
    sizeInBytes: 11000000,
    license: 'CC BY-SA 3.0',
    connections: ['train', 'test'],
  },
  {
    name: 'Wine Quality',
    description: 'Physicochemical properties of red and white wines',
    identifier: 'wine',
    url: 'https://archive.ics.uci.edu/ml/datasets/wine+quality',
    numberOfRecords: 6497,
    sizeInBytes: 258698,
    license: 'CC0 1.0',
    connections: ['train'],
  },
  {
    name: 'Iris Flower',
    description: 'Classic dataset for classification of iris plants',
    identifier: 'iris',
    url: 'https://archive.ics.uci.edu/ml/datasets/iris',
    numberOfRecords: 150,
    sizeInBytes: 4136,
    license: 'Public Domain',
    connections: ['train', 'test'],
  },
  {
    name: 'Boston Housing',
    description: 'Housing prices in Boston neighborhoods',
    identifier: 'boston',
    url: 'https://archive.ics.uci.edu/ml/machine-learning-databases/housing/',
    numberOfRecords: 506,
    sizeInBytes: 42894,
    license: 'Public Domain',
    connections: ['train1', 'train2', 'test'],
  },
  {
    name: 'Fashion MNIST',
    description: 'Images of clothing items for classification',
    identifier: 'fashion_mnist',
    url: 'https://github.com/zalandoresearch/fashion-mnist',
    numberOfRecords: 70000,
    sizeInBytes: 29900000,
    license: 'MIT',
    connections: ['data'],
  },
  {
    name: 'CIFAR-10',
    description: 'Small images across 10 categories',
    identifier: 'cifar10',
    url: 'https://www.cs.toronto.edu/~kriz/cifar.html',
    numberOfRecords: 60000,
    sizeInBytes: 170000000,
    license: 'MIT',
    connections: ['data'],
  },
  {
    name: 'IMDB Reviews',
    description: 'Movie reviews for sentiment analysis',
    identifier: 'imdb_reviews',
    url: 'https://ai.stanford.edu/~amaas/data/sentiment/',
    numberOfRecords: 50000,
    sizeInBytes: 134700000,
    license: 'Creative Commons SA 3.0',
    connections: ['data'],
  },
  {
    name: 'Titanic Passenger Data',
    description: 'Survival data for passengers on the Titanic',
    identifier: 'titanic',
    url: 'https://www.kaggle.com/c/titanic',
    numberOfRecords: 891,
    sizeInBytes: 61194,
    license: 'Public Domain',
    connections: ['data'],
  },
  {
    name: 'Pima Indians Diabetes',
    description: 'Medical data for diabetes prediction',
    identifier: 'diabetes',
    url: 'https://www.kaggle.com/uciml/pima-indians-diabetes-database',
    numberOfRecords: 768,
    sizeInBytes: 23040,
    license: 'Public Domain',
    connections: ['data'],
  },
  {
    name: 'Breast Cancer Wisconsin',
    description:
      'Features computed from breast mass images for diagnosis and lorem ipsum',
    identifier: 'breast_cancer',
    url: 'https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+(Diagnostic)',
    numberOfRecords: 569,
    sizeInBytes: 122880,
    license: 'CC0 1.0',
    connections: ['data'],
  },
  {
    name: 'Reuters News Topics',
    description: 'News articles categorized by topic',
    identifier: 'reuters',
    url: 'http://kdd.ics.uci.edu/databases/reuters21578/reuters21578.html',
    numberOfRecords: 10788,
    sizeInBytes: 35000000,
    license: 'Research Only',
    connections: ['data'],
  },
  {
    name: 'UCI Heart Disease',
    description: 'Clinical data for diagnosing heart disease',
    identifier: 'heart_disease',
    url: 'https://archive.ics.uci.edu/ml/datasets/Heart+Disease',
    numberOfRecords: 303,
    sizeInBytes: 22725,
    license: 'Public Domain',
    connections: ['data'],
  },
];

export type datasetDefinition = {
  name: string;
  description: string;
  identifier: string;
  url: string | null | undefined;
  numberOfRecords: number;
  sizeInBytes: number;
  license: string | null | undefined;
  connections: string[];
};
