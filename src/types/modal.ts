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
  onConfirm: () => void;
  onCancel: () => void;
}

interface SendResult {
  copied: boolean;
}

type AnimateModalProps = Pick<ModalProps, "isOpen">;

export type {
  ModalProps,
  AnimateModalProps,
  ConfirmRedirectModalProps,
  SendResult,
};
