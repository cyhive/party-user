"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/ui/button";
import { useModal } from "../../context/modal-context";
import { showToast } from "../../lib/toast";
import { CreateGalleryItemModal } from "../../components/admin/gallery/create-gallery-item-modal";
import { DeleteGalleryItemModal } from "../../components/admin/gallery/delete-gallery-item-modal";
import { GalleryTable } from "../../components/admin/gallery/gallery-table";
import {
  createGalleryColumns,
  GalleryItem,
} from "../../components/admin/gallery/gallery-table-columns";
import { GalleryItemFormValues } from "../../components/admin/gallery/gallery-form";

export default function NewsPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const { openModal, setModalData } = useModal();

  /* ===================== FETCH ===================== */
  const fetchItems = async () => {
    try {
      const res = await fetch("/admin/api/news-items");
      if (!res.ok) throw new Error();
      setItems(await res.json());
    } catch {
      showToast.error("Failed to fetch news");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  /* ===================== SORT ===================== */
  const sortedItems = useMemo(() => {
    return [...items].sort(
      (a, b) =>
        new Date(b.createdAt || "").getTime() -
        new Date(a.createdAt || "").getTime()
    );
  }, [items]);

  /* ===================== CREATE ===================== */
  const handleCreateClick = () => {
    setModalData("editingGalleryItem", null);
    openModal("createGalleryItem");
  };

  /* ===================== EDIT ===================== */
  const handleEditClick = (item: GalleryItem) => {
    setModalData("editingGalleryItem", item);
    openModal("createGalleryItem");
  };

  /* ===================== SAVE ===================== */
  const handleSaveItem = async (
    data: GalleryItemFormValues,
    pendingFiles?: File[],
    id?: string
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description || "");
      formData.append("existingImages", JSON.stringify(data.images));
      formData.append(
        "removedImages",
        JSON.stringify(data.removedImages || [])
      );

      pendingFiles?.forEach((file) =>
        formData.append("images", file)
      );

      const url = id
        ? `/admin/api/news-items?id=${id}`
        : "/admin/api/news-items";

      const method = id ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error();

      const saved = await res.json();

      setItems((prev) =>
        id
          ? prev.map((i) => (i._id === id ? saved : i))
          : [saved, ...prev]
      );

      showToast.success(id ? "News updated" : "News created");
    } catch {
      showToast.error("Failed to save news");
    }
  };

  /* ===================== DELETE ===================== */
  const handleDeleteClick = (id: string) => {
    setModalData("selectedGalleryItemIds", [id]);
    openModal("deleteGalleryItem");
  };

  const handleBulkDelete = async (ids: string[]) => {
    try {
      await fetch(`/admin/api/news-items?ids=${ids.join(",")}`, {
        method: "DELETE",
      });

      setItems((prev) => prev.filter((i) => !ids.includes(i._id)));
      showToast.success("News deleted");
    } catch {
      showToast.error("Delete failed");
    }
  };

  const columns = createGalleryColumns({
    onEdit: handleEditClick,
    onDelete: handleDeleteClick,
  });

  return (
    <div className="flex flex-col gap-4">
      <CreateGalleryItemModal onSave={handleSaveItem} />

      <DeleteGalleryItemModal
        onDelete={handleBulkDelete}
        entityName="News"
        entityNamePlural="News"
      />

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">News</h2>
          <p className="text-muted-foreground">
            Manage news items and images.
          </p>
        </div>
        <Button onClick={handleCreateClick}>Create News</Button>
      </div>

      <GalleryTable columns={columns} data={sortedItems} />
    </div>
  );
}
