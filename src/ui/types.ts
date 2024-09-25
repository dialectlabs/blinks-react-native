import {
  type ActionParameterSelectable,
  type ActionParameterType,
  type ActionSupportability,
  type SecurityActionState,
} from '@dialectlabs/blinks-core';

export type SecurityState = SecurityActionState;

export enum DisclaimerType {
  BLOCKED = 'blocked',
  UNKNOWN = 'unknown',
}

export type Disclaimer =
  | {
      type: DisclaimerType.BLOCKED;
      ignorable: boolean;
      hidden: boolean;
      onSkip: () => void;
    }
  | {
      type: DisclaimerType.UNKNOWN;
      ignorable: boolean;
    };

export interface ButtonProps {
  text: string | null;
  loading?: boolean;
  variant?: 'default' | 'success' | 'error';
  disabled?: boolean;
  onClick: (params?: Record<string, string | string[]>) => void;
}

type InputType = ActionParameterType;

export interface InputProps {
  type: InputType;
  placeholder?: string;
  name: string;
  disabled: boolean;
  required?: boolean;
  min?: number | string;
  max?: number | string;
  pattern?: string;
  description?: string;
  button?: ButtonProps;
  options?: ActionParameterSelectable<
    'select' | 'radio' | 'checkbox'
  >['options'];
}

export interface FormProps {
  inputs: Array<Omit<InputProps, 'button'>>;
  button: ButtonProps;
}

export interface LayoutProps {
  image?: string;
  error?: string | null;
  success?: string | null;
  websiteUrl?: string | null;
  websiteText?: string | null;
  disclaimer?: Disclaimer | null;
  securityState: SecurityActionState;
  title: string;
  description: string;
  buttons?: ButtonProps[];
  inputs?: InputProps[];
  form?: FormProps;
  supportability: ActionSupportability;
  id?: string;
}
