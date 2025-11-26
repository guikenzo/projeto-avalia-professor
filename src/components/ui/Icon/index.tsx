import colors from '@/theme/colors';
import * as Assets from '@public/icons';

export type TIcon = keyof typeof Assets;

export type IconProps = {
  name: TIcon;
  size?: number;
  color?: string;
  strokeWidth?: number;
  rotate?: number;
  fill?: string;
};

const Icon = ({
  name,
  size = 24,
  color = colors.primary[100],
  strokeWidth = 1.5,
  rotate = 0,
  fill = 'none',
}: IconProps) => {
  return Assets[name]({
    width: size,
    height: size,
    color,
    strokeWidth,
    fill,
    transform: `rotate(${rotate})`,
  });
};

export default Icon;
