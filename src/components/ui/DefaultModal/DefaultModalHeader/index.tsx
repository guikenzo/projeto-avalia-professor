import Icon from '../../Icon';

type Props = {
  title: string;
  onClose?: () => void;
};

const DefaultModalHeader = ({ title, onClose }: Props) => {
  return (
    <div className="bg-neutral-background border-neutral-20 flex items-center justify-between border-b p-3">
      <h5 className="text-xl">{title}</h5>

      {onClose && (
        <button
          className="flex cursor-pointer items-center justify-center rounded-full hover:bg-black/5"
          style={{ width: 28, height: 28 }}
          onClick={onClose}
        >
          <Icon name="XIcon" size={16} />
        </button>
      )}
    </div>
  );
};

export default DefaultModalHeader;
