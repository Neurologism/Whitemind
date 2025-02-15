import { EditorConfig } from '~/types/editorConfig.class';
import { classicBlocks } from './blockLists/classic.blocks';
import { perceptronBlocks } from './blockLists/perceptron.blocks';

export const editorConfigs = {
  classic: new EditorConfig(classicBlocks),
  perceptron: new EditorConfig(perceptronBlocks),
} as Record<string, EditorConfig>;
