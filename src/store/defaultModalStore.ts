/* eslint-disable no-unused-vars */
import { create } from 'zustand';

type ModalProps = {
  title: string;
  message: string;
  confirmText: string;
  notice?: string;
  onConfirm?: () => void | Promise<void>;
  cancelText?: string;
  onCancel?: () => void | Promise<void>;
  successMessage?: string;
};

type Store = {
  modal: ModalProps | null;
  openModal: (props: ModalProps) => void;
  closeModal: () => void;
};

export const useDefaultModal = create<Store>(set => ({
  modal: null,
  openModal: props => set({ modal: props }),
  closeModal: () => set({ modal: null }),
}));
