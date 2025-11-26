'use client';

import { ButtonHTMLAttributes, MouseEvent } from 'react';

import { useDisableDelay } from '@/hooks/common';
import colors from '@/theme/colors';

import Icon, { IconProps } from '../Icon';
import Loader from '../Loader';

type Props = {
  color?: string;
  text?: string;
  wired?: boolean;
  leftIcon?: IconProps;
  isLoading?: boolean;
  withoutDelay?: boolean;
  width?: number | string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  text,
  wired = false,
  color = colors.primary[100],
  leftIcon,
  isLoading = false,
  withoutDelay = false,
  onClick,
  width = 'fit-content',
  type = 'button',
  disabled,
  ...props
}: Props) => {
  const { executeWithDelay, isLoading: loading } = useDisableDelay();

  const handleTextColor = () => {
    if (wired) {
      return color;
    }
    return colors.neutral.white;
  };

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick && withoutDelay) {
      await onClick(e);
      return;
    }
    if (onClick) {
      await executeWithDelay(() => onClick(e));
      return;
    }
  };

  return (
    <button
      className={`relative flex items-center justify-center gap-3 overflow-hidden rounded-lg border-2 p-2 ${loading || isLoading ? '' : 'hover:opacity-85'}`}
      disabled={disabled || isLoading || loading}
      style={{
        backgroundColor: wired ? 'transparent' : color,
        borderColor: wired ? color : 'transparent',
        color: handleTextColor(),
        width,
        cursor: disabled || isLoading || loading ? 'default' : 'pointer',
      }}
      type={type}
      onClick={handleClick}
      {...props}
    >
      {leftIcon && <Icon color={handleTextColor()} {...leftIcon} />}

      <span className="text-lg font-semibold">{text}</span>

      {(isLoading || loading) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Loader color={handleTextColor()} />
        </div>
      )}
    </button>
  );
};

export default Button;
