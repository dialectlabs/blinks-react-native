import type { InputProps } from '../types';

import { ActionCheckboxGroup } from './ActionCheckboxGroup';
import { ActionDateInput } from './ActionDateInput';
import { ActionDateTimeInput } from './ActionDateTimeInput';
import { ActionNumberInput } from './ActionNumberInput';
import { ActionRadioGroup } from './ActionRadioGroup';
import { ActionSelect } from './ActionSelect';
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
    case 'select':
      return <ActionSelect {...input} />;
    case 'number':
      return <ActionNumberInput {...input} />;
    default:
      return <ActionTextInput {...input} />;
  }
};
