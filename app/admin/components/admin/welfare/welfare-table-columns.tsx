"use client";

import React from "react";
import Image from "next/image";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "../../ui/checkbox";
import { Button } from "../../ui/button";

export interface WelfareItem {
  _id: string;
  title: string;
  description?: string;
  content?: string; // 1. Added content field to interface
  icon?: string;
  createdAt: string;
  updatedAt?: string;
}

interface CreateWelfareColumnsOptions {
  onEdit: (item: WelfareItem) => void;
  onDelete: (id: string) => void;
}

/* Helper function to strip HTML tags for table preview */
const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>?/gm, "");
};

/* ========== IMAGE PREVIEW CELL ========== */
function IconCell({ icon, title }: { icon?: string; title: string }) {
  const [open, setOpen] = React.useState(false);

  if (!icon) {
    return <span className="text-muted-foreground">-</span>;
  }

  return (
    <>
      <div
        className="relative h-12 w-12 rounded-md border overflow-hidden cursor-pointer hover:opacity-75"
        onClick={() => setOpen(true)}
      >
        <Image src={icon} alt={title} fill className="object-cover" />
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-white rounded-lg p-4 max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
            >
              ✕
            </button>
            <div className="relative h-96 w-96">
              <Image src={icon} alt={title} fill className="object-contain" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function createWelfareColumns({
  onEdit,
  onDelete,
}: CreateWelfareColumnsOptions): ColumnDef<WelfareItem>[] {
  return [
    {
      id: "select",
      header: ({ table }) => {
        const isIndeterminate = table.getIsSomePageRowsSelected();
        const isChecked = table.getIsAllPageRowsSelected();
        return (
          <Checkbox
            // @ts-expect-error Checkbox supports indeterminate state
            checked={isIndeterminate ? "indeterminate" : isChecked}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        );
      },
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "icon",
      header: "Icon",
      cell: ({ row }) => (
        <IconCell
          icon={row.getValue("icon") as string}
          title={row.getValue("title") as string}
        />
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const description = row.getValue("description") as string;
        return (
          <div className="max-w-[150px] truncate text-xs text-muted-foreground">
            {description || "-"}
          </div>
        );
      },
    },
    // 2. NEW CONTENT COLUMN
    {
      accessorKey: "content",
      header: "Full Details",
      cell: ({ row }) => {
        const rawContent = (row.getValue("content") as string) || "";
        const cleanText = stripHtml(rawContent);
        return (
          <div className="max-w-[200px] truncate text-sm italic text-gray-500">
            {cleanText || "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt") as string);
        return <div className="text-xs whitespace-nowrap">{date.toLocaleDateString()}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(item._id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
}