import { createBox, createText, type BoxProps } from '@shopify/restyle';
import type { Theme } from './theme';

export const Box = createBox<Theme>();
export { type BoxProps };
export const Text = createText<Theme>();
