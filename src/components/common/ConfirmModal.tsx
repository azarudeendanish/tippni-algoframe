"use client";

import { Button } from "../ui/button";

export default function ConfirmModal({
  open,
  title,
  description,
  confirmText = "Yes",
  cancelText = "Cancel",
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[20000]"
      onClick={onCancel}
    >
      <div
        className="bg-secondary-solid p-5 rounded-xl w-[90%] max-w-sm shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>

        <div className="flex justify-end gap-3 mt-5">
          <Button
            className="px-4 py-2 text-sm rounded cursor-pointer"
            onClick={onCancel}
            variant='outline'
          >
            {cancelText}
          </Button>
          <Button
            className="px-4 py-2 text-sm rounded bg-red-500 text-white cursor-pointer"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
