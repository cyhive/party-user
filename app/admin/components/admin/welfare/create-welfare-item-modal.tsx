"use client";

import { useModal } from "../../../context/modal-context";
import { WelfareForm, WelfareFormValues } from "./welfare-form";
import { Button } from "../../ui/button";

export function CreateWelfareItemModal({
  onSave,
}: {
  onSave: (
    data: WelfareFormValues,
    iconFile?: File,
    id?: string
  ) => void;
}) {
  const { modals, modalData, closeModal } = useModal();

  const isOpen = modals?.createWelfareItem;
  const editingItem = modalData?.editingWelfareItem;

  const handleClose = () => {
    closeModal("createWelfareItem");
  };

  const handleSubmit = (data: WelfareFormValues, file?: File) => {
    const itemId = (editingItem as Record<string, unknown>)?._id as string | undefined;
    onSave(data, file, itemId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {editingItem ? "Edit Welfare Scheme" : "Create Welfare Scheme"}
          </h2>
          <Button variant="ghost" onClick={handleClose}>
            ✕
          </Button>
        </div>

        <WelfareForm
          // @ts-expect-error Type mismatch with modal data
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      </div>
    </div>
  );
}
