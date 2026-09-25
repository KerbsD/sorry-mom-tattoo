"use client";

import { X } from "lucide-react";
import useAnimateModal from "./useAnimateModal";
import type { ModalProps } from "@/types/modal";

function Modal({ isOpen, onClose, children, title, className }: ModalProps) {
  const { overlayRef, panelRef } = useAnimateModal({
    isOpen,
  });

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
      <div ref={panelRef} className={className}>
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-1 right-1 text-white/70 transition-colors hover:text-white"
        >
          <X size={28} />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
