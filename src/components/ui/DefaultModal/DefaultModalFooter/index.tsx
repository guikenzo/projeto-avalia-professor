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
    <div className="border-neutral-20 flex w-full border-t">
      {cancelText && (
        <DefaultModalButton text={cancelText} onClick={handleCancel} />
      )}

      <DefaultModalButton text={confirmText} onClick={handleConfirm} />
    </div>
  );
};

export default DefaultModalFooter;
