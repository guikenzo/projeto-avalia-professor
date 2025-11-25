import colors from '@/theme/colors';

type Props = {
  size?: number;
  color?: string;
};

const Loader = ({ size = 20, color = colors.primary[100] }: Props) => {
  const borderColor = `${color}54`; // 33% opacity

  return (
    <div
      className="flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <span
        className="animate-spin rounded-full"
        style={{
          width: size,
          height: size,
          borderWidth: size / 6,
          borderColor,
          borderTopColor: color,
        }}
      />
    </div>
  );
};

export default Loader;
