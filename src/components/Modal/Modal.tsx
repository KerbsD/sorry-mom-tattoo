"use client";

import { X } from "lucide-react";
import useAnimateModal from "./useAnimateModal";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const { overlayRef, panelRef } = useAnimateModal({
    isOpen,
  });

  // if (!isOpen) return;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 hidden items-center justify-center overscroll-contain bg-black/70 backdrop-blur-sm"
      style={{ display: "none" }}
      role="dialog"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      aria-modal="true"
      labelledby-label={title}
      data-lenis-prevent
    >
      {/* Content */}
      <div
        ref={panelRef}
        className="relative mx-4 flex h-120 w-full max-w-4xl flex-col rounded-lg bg-neutral-900 md:h-125 md:flex-row"
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute z-1000 -top-10 right-0 text-white/70 transition-colors hover:text-white"
        >
          <X size={28} />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
