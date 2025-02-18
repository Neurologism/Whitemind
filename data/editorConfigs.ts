import { EditorConfig } from '~/types/editorConfig.class';
import { classicBlocks, classicEdgeColors } from './blockLists/classic.blocks';
import {
  perceptronBlocks,
  perceptronEdgeColors,
} from './blockLists/perceptron.blocks';
import type { OptionalExports } from '~/types/components.type';

export const editorConfigs = {
  classic: new EditorConfig(classicBlocks, classicEdgeColors),
  perceptron: new EditorConfig(
    perceptronBlocks,
    perceptronEdgeColors,
    () => {
      const perceptronTrainingStore = usePerceptronTrainingStore();
      return perceptronTrainingStore.export();
    },
    (editorConfig: EditorConfig, data: OptionalExports) => {
      const perceptronTrainingStore = usePerceptronTrainingStore();
      perceptronTrainingStore.import(data);
    }
  ),
} as Record<string, EditorConfig>;
