import type { InputProps } from '../types';

import { ActionCheckboxGroup } from './ActionCheckboxGroup';
import { ActionDateInput } from './ActionDateInput';
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
      return <ActionDateInput {...input} />;
    case 'datetime-local':
      return <ActionDateTimeInput {...input} />;
    // case 'select':
    //   return <ActionSelect {...input} />;

    default:
      return <ActionTextInput {...input} />;
  }
};
