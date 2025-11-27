import DefaultModalButton from './DefaultModalButton';

type Props = {
  confirmText: string;
  cancelText?: string;
  handleConfirm?: () => Promise<void> | void;
  handleCancel?: () => Promise<void> | void;
};

const DefaultModalFooter = ({
  confirmText,
  cancelText,
  handleConfirm,
  handleCancel,
}: Props) => {
  return (
    <div className="flex w-full border-t border-neutral-200">
      {cancelText && (
        <DefaultModalButton text={cancelText} onClick={handleCancel} />
      )}

      <DefaultModalButton text={confirmText} onClick={handleConfirm} />
    </div>
  );
};

export default DefaultModalFooter;
