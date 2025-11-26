import colors from '@/theme/colors';

import Icon from '../Icon';

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChangeText?: (text: string) => void;
  borderColor?: string;
  bgColor?: string;
};

const SearchBar = ({
  placeholder = 'Buscar',
  value = '',
  onChangeText,
  borderColor = colors.primary[100],
  bgColor = colors.neutral.white,
}: SearchBarProps) => {
  return (
    <div
      className="flex items-center justify-center gap-3 rounded-lg border p-2 transition-all"
      style={{ borderColor, backgroundColor: bgColor, width: 500 }}
    >
      <div className="z-10">
        <Icon color={colors.neutral[40]} name="MagnifyingIcon" size={24} />
      </div>

      <input
        className="text-neutral-80 placeholder-neutral-20 font-lexend flex w-full bg-transparent text-lg font-light outline-none"
        placeholder={placeholder}
        value={value}
        onChange={text => onChangeText?.(text.target.value)}
      />
    </div>
  );
};

export default SearchBar;