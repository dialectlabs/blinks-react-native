import {
  type BaseBlinkLayoutProps,
  ButtonActionComponent,
  type ExecutionStatus,
  FormActionComponent,
  isParameterSelectable,
  isPatternAllowed,
  MultiValueActionComponent,
  SingleValueActionComponent,
} from '@dialectlabs/blinks-core';
import { useMemo } from 'react';
import type { LayoutProps } from '../types';

const buttonVariantMap: Record<
  ExecutionStatus,
  'default' | 'error' | 'success'
> = {
  'checking-supportability': 'default',
  blocked: 'default',
  idle: 'default',
  executing: 'default',
  success: 'success',
  error: 'error',
};

const buttonLabelMap: Record<ExecutionStatus, string | null> = {
  'checking-supportability': 'Loading',
  blocked: null,
  idle: null,
  executing: 'Executing',
  success: 'Completed',
  error: 'Failed',
};

const SOFT_LIMIT_BUTTONS = 10;
const SOFT_LIMIT_INPUTS = 3;
const SOFT_LIMIT_FORM_INPUTS = 10;

export const useLayoutPropNormalizer = ({
  executeFn,
  executionStatus,
  executingAction,
  action,
  caption,
  ...props
}: BaseBlinkLayoutProps): LayoutProps => {
  const buttons = useMemo(
    () =>
      action?.actions
        .filter((it) => it instanceof ButtonActionComponent)
        .map((it) => it as ButtonActionComponent)
        .filter((it) => (executingAction ? executingAction === it : true))
        .slice(0, SOFT_LIMIT_BUTTONS) ?? [],
    [action, executingAction],
  );
  const inputs = useMemo(
    () =>
      action?.actions
        .filter(
          (it) =>
            it instanceof SingleValueActionComponent ||
            it instanceof MultiValueActionComponent,
        )
        .map((it) =>
          it instanceof SingleValueActionComponent
            ? (it as SingleValueActionComponent)
            : (it as MultiValueActionComponent),
        )
        .filter((it) => (executingAction ? executingAction === it : true))
        .slice(0, SOFT_LIMIT_INPUTS) ?? [],
    [action, executingAction],
  );
  const form = useMemo(() => {
    const [formComponent] =
      action?.actions
        .filter((it) => it instanceof FormActionComponent)
        .map((it) => it as FormActionComponent)
        .filter((it) => (executingAction ? executingAction === it : true)) ??
      [];

    return formComponent;
  }, [action, executingAction]);

  const asButtonProps = (it: ButtonActionComponent) => {
    return {
      text: buttonLabelMap[executionStatus] ?? it.label,
      loading: executionStatus === 'executing' && it === executingAction,
      disabled:
        action.disabled ||
        action.type === 'completed' ||
        executionStatus !== 'idle',
      variant:
        buttonVariantMap[
          action.type === 'completed' ? 'success' : executionStatus
        ],
      onClick: (params?: Record<string, string | string[]>) =>
        executeFn(it.parentComponent ?? it, params),
    };
  };

  const asInputProps = (
    it: SingleValueActionComponent | MultiValueActionComponent,
    { placement }: { placement: 'form' | 'standalone' } = {
      placement: 'standalone',
    },
  ) => {
    return {
      type: it.parameter.type ?? 'text',
      placeholder: it.parameter.label,
      disabled:
        action.disabled ||
        action.type === 'completed' ||
        executionStatus !== 'idle',
      name: it.parameter.name,
      required: it.parameter.required,
      min: it.parameter.min,
      max: it.parameter.max,
      pattern:
        it instanceof SingleValueActionComponent &&
        isPatternAllowed(it.parameter)
          ? it.parameter.pattern
          : undefined,
      options: isParameterSelectable(it.parameter)
        ? it.parameter.options
        : undefined,
      description: it.parameter.patternDescription,
      button:
        placement === 'standalone'
          ? asButtonProps(it.toButtonActionComponent())
          : undefined,
    };
  };

  const asFormProps = (it: FormActionComponent) => {
    return {
      button: asButtonProps(it.toButtonActionComponent()),
      inputs: it.parameters.slice(0, SOFT_LIMIT_FORM_INPUTS).map((parameter) =>
        asInputProps(it.toInputActionComponent(parameter.name), {
          placement: 'form',
        }),
      ),
    };
  };

  const normalizedCaption = useMemo(() => {
    if (!caption) {
      return {};
    }

    if (caption.type === 'success') {
      return {
        success: caption.text,
      };
    }

    if (caption.type === 'error') {
      return {
        error: caption.text,
      };
    }

    return {};
  }, [caption]);

  return {
    ...props,
    title: action.title,
    description: action.description,
    image: action.icon,
    buttons: buttons.map(asButtonProps),
    inputs: inputs.map((i) => asInputProps(i)),
    form: form ? asFormProps(form) : undefined,
    ...normalizedCaption,
  };
};
