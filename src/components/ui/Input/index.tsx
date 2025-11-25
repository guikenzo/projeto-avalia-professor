'use client';

import type { ComponentProps } from 'react';
import { useState } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { IMaskInput, ReactMaskProps } from 'react-imask';

import colors from '@/theme/colors';

import Icon, { IconProps } from '../Icon';

type Props<TFieldValues extends FieldValues> = {
  label?: string;
  password?: boolean;
  placeholder?: string;
  leftIcon?: IconProps;
  mask?: string;
} & UseControllerProps<TFieldValues> &
  Omit<
    ComponentProps<'input'>,
    'name' | 'defaultValue' | 'value' | 'onChange'
  > &
  Omit<ReactMaskProps<HTMLInputElement>, 'name' | 'value' | 'onAccept'>;

const Input = <TFieldValues extends FieldValues>({
  label,
  password,
  placeholder,
  leftIcon,
  control,
  name,
  mask,
  ...props
}: Props<TFieldValues>) => {
  const [passwordHidden, setPasswordHidden] = useState(password);

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const commonProps = {
    ...field,
    ...props,
    className:
      'text-neutral-60 placeholder:text-neutral-40 w-full p-2 text-lg focus-within:outline-none',
    placeholder,
    style: {
      paddingLeft: leftIcon ? 40 : 8,
      paddingRight: password ? 44 : undefined,
    },
    type: password ? (passwordHidden ? 'password' : 'text') : props.type,
  };

  return (
    <div className="w-full flex-col gap-2">
      {label && (
        <label className="text-xl text-[#454545]" htmlFor={name}>
          {label}
        </label>
      )}

      <div className="gap-px">
        <div className="relative items-center overflow-hidden rounded-lg border border-[#D0D0D0] bg-white">
          {mask ? (
            <IMaskInput mask={mask} {...commonProps} />
          ) : (
            <input {...commonProps} />
          )}

          {leftIcon && (
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <Icon {...leftIcon} />
            </div>
          )}

          {password && (
            <button
              aria-label={passwordHidden ? 'Show password' : 'Hide password'}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 hover:bg-black/5"
              type="button"
              onClick={() => setPasswordHidden(!passwordHidden)}
            >
              <Icon
                color={
                  passwordHidden ? colors.neutral[40] : colors.primary[100]
                }
                name={passwordHidden ? 'EyeOffIcon' : 'EyeIcon'}
              />
            </button>
          )}
        </div>

        {error?.message && (
          <span className="text-alert-error text-[16px] text-red-500">
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
