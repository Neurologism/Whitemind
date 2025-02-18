import { EditorConfig } from '~/types/editorConfig.class';
import { classicBlocks, classicEdgeColors } from './blockLists/classic.blocks';
import {
  perceptronBlocks,
  perceptronEdgeColors,
} from './blockLists/perceptron.blocks';

export const editorConfigs = {
  classic: new EditorConfig(classicBlocks, classicEdgeColors),
  perceptron: new EditorConfig(perceptronBlocks, perceptronEdgeColors, () => {
    const perceptronTrainingStore = usePerceptronTrainingStore();
    return perceptronTrainingStore.export();
  }),
} as Record<string, EditorConfig>;
