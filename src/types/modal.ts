import type { Channel } from "@/utils/channels";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className: string;
}

interface ConfirmRedirectModalProps {
  channel: Channel;
  willCopy: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

type SendResult = { copied: boolean; copyResult: Promise<boolean> };

type AnimateModalProps = Pick<ModalProps, "isOpen">;

export type {
  ModalProps,
  AnimateModalProps,
  ConfirmRedirectModalProps,
  SendResult,
};
