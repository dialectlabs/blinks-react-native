import { useState } from 'react';
import { Box } from '../components';
import type { FormProps, InputProps } from '../types';
import { ActionButton } from './ActionButton';
import { ActionInput } from './ActionInput';

const buildDefaultValue = (i: InputProps) => {
  if (i.type === 'checkbox') {
    return [i.name, i.options?.filter((o) => o.selected).map((o) => o.value)];
  }
  if (i.type === 'radio' || i.type === 'select') {
    return [i.name, i.options?.find((o) => o.selected)?.value];
  }
  return [i.name, undefined];
};

const buildDefaultFormValues = (inputs: InputProps[]) => {
  return Object.fromEntries(inputs.map((it) => buildDefaultValue(it)));
};

export const ActionForm = ({ form }: { form: FormProps }) => {
  const [values, setValues] = useState<Record<string, string | string[]>>(
    buildDefaultFormValues(form.inputs),
  );
  const [validity, setValidity] = useState<Record<string, boolean>>(
    Object.fromEntries(form.inputs.map((i) => [i.name, false])),
  );

  const onChange = (name: string, value: string | string[]) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onValidityChange = (name: string, state: boolean) => {
    setValidity((prev) => ({ ...prev, [name]: state }));
  };

  const disabled = Object.values(validity).some((v) => !v);

  return (
    <Box flexDirection="column" gap={3}>
      {form.inputs.map((input) => (
        <ActionInput
          key={input.name}
          {...input}
          onChange={(v: string | string[]) => onChange(input.name, v)}
          onValidityChange={(v: boolean) => onValidityChange(input.name, v)}
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
