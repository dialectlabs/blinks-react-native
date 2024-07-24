import type { ReactNode } from 'react';
import { Box } from '../index';

type SnackbarVariant = 'warning' | 'error';

interface Props {
  variant?: SnackbarVariant;
  children: ReactNode | ReactNode[];
}

export const Snackbar = ({ variant = 'warning', children }: Props) => {
  return (
    <Box
      borderRadius="lg"
      borderWidth={1}
      p={3}
      backgroundColor={
        variant === 'error' ? 'transparent-error' : 'transparent-warning'
      }
      borderColor={variant === 'error' ? 'stroke-error' : 'stroke-warning'}
    >
      {children}
    </Box>
  );
};
