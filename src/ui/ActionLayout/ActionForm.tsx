import { useState } from 'react';
import { Box } from '../index';
import { ActionButton } from './ActionButton';
import { ActionInput } from './ActionInput';
import type { FormProps } from './types';

export const SOFT_LIMIT_FORM_INPUTS = 10;

export const ActionForm = ({ form }: { form: FormProps }) => {
  const inputs = form.inputs.slice(0, SOFT_LIMIT_FORM_INPUTS);
  const [values, setValues] = useState(
    Object.fromEntries(inputs.map((i) => [i.name, ''])),
  );

  const onChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const disabled = inputs.some((i) => i.required && values[i.name] === '');

  return (
    <Box flexDirection="column" gap={3}>
      {inputs.map((input) => (
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
