"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea"; // Ensure you have this component
import { Button } from "../../ui/button";

// 1. Import Text Editor
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-40 w-full bg-slate-100 animate-pulse rounded-md" />,
});

import "react-quill-new/dist/quill.snow.css"; 

export type WelfareFormValues = {
  title: string;
  description?: string;
  content?: string; // Added content field
};

interface WelfareFormData {
  title: string;
  description?: string;
  content?: string; // Added content field
  icon?: string;
  _id?: string;
}

export function WelfareForm({
  initialData,
  onSubmit,
  onCancel,
}: {
  initialData?: WelfareFormData | null;
  onSubmit: (values: WelfareFormValues, iconFile?: File) => void;
  onCancel?: () => void;
}) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [content, setContent] = useState(initialData?.content || ""); // State for Editor
  
  const [iconFile, setIconFile] = useState<File | undefined>();
  const [iconPreview, setIconPreview] = useState<string>(initialData?.icon || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "clean"],
    ],
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Passing all three fields back
      await onSubmit({ title, description, content }, iconFile);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 1. Normal Input: Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Scheme Title</label>
        <Input
          placeholder="Enter title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* 2. Normal Input: Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Short Description</label>
        <Textarea
          placeholder="Enter a brief summary..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      {/* 3. Text Editor: Content */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Full Content / Details</label>
        <div className="bg-white">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            className="[&_.ql-editor]:min-h-[200px] [&_.ql-container]:rounded-b-md [&_.ql-toolbar]:rounded-t-md"
            placeholder="Write the full details here..."
          />
        </div>
      </div>

      {/* 4. Icon Upload */}
      <div className="space-y-2 pt-2">
        <label className="block text-sm font-medium text-gray-700">Icon Image</label>
        {iconPreview && (
          <div className="relative w-16 h-16 mb-2">
            <Image
              src={iconPreview}
              alt="Icon preview"
              fill
              className="object-cover rounded-md border"
            />
          </div>
        )}
        <Input
          type="file"
          accept="image/svg+xml,image/png,image/jpeg,image/webp"
          onChange={handleFileChange}
          className="cursor-pointer"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t mt-6">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initialData ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}