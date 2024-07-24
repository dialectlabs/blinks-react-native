import React, { useState } from 'react';
import { Box } from '../index';
import { ActionButton } from './ActionButton';
import type { FormProps } from './types';
import { ActionInput } from './ActionInput';

export const ActionForm = ({ form }: { form: FormProps }) => {
  const [values, setValues] = useState(
    Object.fromEntries(form.inputs.map((i) => [i.name, '']))
  );

  const onChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const disabled = form.inputs.some((i) => i.required && values[i.name] === '');

  return (
    <Box flex={1} flexDirection="column" gap={3}>
      {form.inputs.map((input) => (
        <ActionInput
          key={input.name}
          {...input}
          onChange={(v) => onChange(input.name, v)}
        />
      ))}
      <ActionButton
        {...form.button}
        onClick={() => form.button.onClick(values)}
        disabled={form.button.disabled || disabled}
      />
    </Box>
  );
};
