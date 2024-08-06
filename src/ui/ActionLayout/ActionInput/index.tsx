import type { InputProps } from '../types';

import { ActionCheckboxGroup } from './ActionCheckboxGroup';
import { ActionDateTimeInput } from './ActionDateTimeInput';
import { ActionRadioGroup } from './ActionRadioGroup';
import { ActionTextInput } from './ActionTextInput';

export const ActionInput = (
  input: InputProps & { onChange?: (value: string | string[]) => void },
) => {
  switch (input.type) {
    case 'checkbox':
      return <ActionCheckboxGroup {...input} />;
    case 'radio':
      return <ActionRadioGroup {...input} />;
    case 'date':
    case 'datetime-local':
      return <ActionDateTimeInput {...input} />;
    // case 'select':
    //   return <ActionSelect {...input} />;

    default:
      return <ActionTextInput {...input} />;
  }
};
