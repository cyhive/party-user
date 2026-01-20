"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { useModal } from "../../../context/modal-context";

interface DeleteWelfareItemModalProps {
  onDelete: (ids: string[]) => void;
  entityName?: string;
  entityNamePlural?: string;
}

export function DeleteWelfareItemModal({
  onDelete,
  entityName = "Welfare Scheme",
  entityNamePlural = "Welfare Schemes",
}: DeleteWelfareItemModalProps) {
  const { modals, closeModal, modalData } = useModal();
  const isOpen = modals?.deleteWelfareItem;
  const selectedIds = modalData?.selectedWelfareItemIds || [];

  const handleClose = () => {
    closeModal("deleteWelfareItem");
  };

  const handleConfirm = () => {
    onDelete(selectedIds);
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {entityNamePlural}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {selectedIds.length} {entityName.toLowerCase()}
            {selectedIds.length > 1 ? "s" : ""}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
