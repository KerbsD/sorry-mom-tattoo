import type { Channel } from "@/utils/Channels";

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

type AnimateModalProps = Pick<ModalProps, "isOpen">;

export type { ModalProps, AnimateModalProps, ConfirmRedirectModalProps };
