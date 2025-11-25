import { useDefaultModal } from '@/store/defaultModalStore';

import DefaultModalBackdrop from './DefaultModalBackdrop';
import DefaultModalFooter from './DefaultModalFooter';
import DefaultModalHeader from './DefaultModalHeader';

const DefaultModal = () => {
  const { modal, closeModal, openModal } = useDefaultModal();

  if (!modal) {
    return null;
  }

  const handleConfirm = async () => {
    closeModal();

    if (modal.onConfirm) {
      await modal.onConfirm();
    }

    if (modal.successMessage) {
      openModal({
        title: 'Sucesso!',
        message: modal.successMessage,
        confirmText: 'Voltar',
      });
    }
  };

  const handleCancel = async () => {
    closeModal();
    if (modal.onCancel) {
      await modal.onCancel();
    }
  };

  return (
    <DefaultModalBackdrop>
      <dialog className="relative flex h-[250px] w-[400px] flex-col overflow-hidden rounded-lg bg-white">
        <DefaultModalHeader title={modal.title} />

        <div className="flex flex-grow flex-col gap-3 p-3">
          <p className="text-neutral-60 text-lg">{modal.message}</p>

          {modal.notice && (
            <p className="text-neutral-40 text-sm">{modal.notice}</p>
          )}
        </div>

        <DefaultModalFooter
          cancelText={modal.cancelText}
          confirmText={modal.confirmText}
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />
      </dialog>
    </DefaultModalBackdrop>
  );
};

export default DefaultModal;
