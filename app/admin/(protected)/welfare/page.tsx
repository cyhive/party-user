"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/ui/button";
import { useModal } from "../../context/modal-context";
import { showToast } from "../../lib/toast";
import { CreateWelfareItemModal } from "../../components/admin/welfare/create-welfare-item-modal";
import { DeleteWelfareItemModal } from "../../components/admin/welfare/delete-welfare-item-modal";
import { WelfareTable } from "../../components/admin/welfare/welfare-table";
import {
  createWelfareColumns,
  WelfareItem,
} from "../../components/admin/welfare/welfare-table-columns";
import { WelfareFormValues } from "../../components/admin/welfare/welfare-form";

export default function AdminWelfarePage() {
  const [items, setItems] = useState<WelfareItem[]>([]);
  const { openModal, closeModal, setModalData } = useModal();

  /* ================= FETCH ================= */
  const fetchItems = async () => {
    try {
      const res = await fetch("/admin/api/welfare");
      if (!res.ok) throw new Error();
      setItems(await res.json());
    } catch {
      showToast.error("Failed to fetch welfare items");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  /* ================= SORT ================= */
  const sortedItems = useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      ),
    [items]
  );

  /* ================= CREATE ================= */
  const handleCreate = () => {
    setModalData("editingWelfareItem", null);
    openModal("createWelfareItem");
  };

  /* ================= EDIT ================= */
  const handleEdit = (item: WelfareItem) => {
    setModalData("editingWelfareItem", item);
    openModal("createWelfareItem");
  };

  /* ================= SAVE ================= */

const handleSave = async (
  data: WelfareFormValues,
  iconFile?: File,
  id?: string
) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    
    // ADD THIS LINE BELOW:
    formData.append("content", data.content || ""); 

    if (iconFile) {
      formData.append("icon", iconFile);
    }

    const url = id
      ? `/admin/api/welfare?id=${id}`
      : "/admin/api/welfare";

    const method = id ? "PUT" : "POST";

    const res = await fetch(url, { method, body: formData });
    if (!res.ok) throw new Error();

    const saved = await res.json();

    setItems((prev) =>
      id
        ? prev.map((i) => (i._id === id ? saved : i))
        : [saved, ...prev]
    );

    showToast.success(id ? "Welfare updated" : "Welfare created");
    closeModal("createWelfareItem");
    setModalData("editingWelfareItem", null);
  } catch {
    showToast.error("Failed to save welfare");
  }
};

  /* ================= DELETE ================= */
  const handleDelete = (id: string) => {
    setModalData("selectedWelfareItemIds", [id]);
    openModal("deleteWelfareItem");
  };

  const handleBulkDelete = async (ids: string[]) => {
    try {
      await fetch(`/admin/api/welfare?ids=${ids.join(",")}`, {
        method: "DELETE",
      });

      setItems((prev) => prev.filter((i) => !ids.includes(i._id)));
      showToast.success("Deleted");
    } catch {
      showToast.error("Delete failed");
    }
  };

  const columns = createWelfareColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <div className="flex flex-col gap-4">
      <CreateWelfareItemModal onSave={handleSave} />
      <DeleteWelfareItemModal onDelete={handleBulkDelete} />

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Welfare Schemes</h2>
          <p className="text-muted-foreground">
            Manage welfare cards and icons
          </p>
        </div>
        <Button onClick={handleCreate}>Create Welfare</Button>
      </div>

      <WelfareTable columns={columns} data={sortedItems} />
    </div>
  );
}
