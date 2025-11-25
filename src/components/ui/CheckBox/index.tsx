import colors from '@/theme/colors';

import Icon from '../Icon';

type Props = {
  isSelected: boolean;
  label: string;
  onClick: () => void;
};

const CheckBox = ({ isSelected, label, onClick }: Props) => {
  return (
    <button
      className="flex w-full cursor-pointer items-center gap-2"
      onClick={onClick}
    >
      <div
        className="flex h-6 w-6 items-center justify-center rounded-md"
        style={{
          backgroundColor: isSelected ? colors.alert.success : 'transparent',
          border: isSelected ? 'none' : `1px solid ${colors.neutral[200]}`,
        }}
      >
        {isSelected && (
          <Icon
            color={colors.white}
            name="CheckIcon"
            size={12}
            strokeWidth={3}
          />
        )}
      </div>

      <span className="text-neutral-80 flex flex-1 text-left text-lg">
        {label}
      </span>
    </button>
  );
};

export default CheckBox;
