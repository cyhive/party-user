"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";

export type WelfareFormValues = {
  title: string;
  description?: string;
};

interface WelfareFormData {
  title: string;
  description?: string;
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
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [iconFile, setIconFile] = useState<File | undefined>();
  const [iconPreview, setIconPreview] = useState<string>(
    initialData?.icon || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      // Create preview
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
      await onSubmit({ title, description }, iconFile);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium">Icon Image</label>
        {iconPreview && (
          <div className="relative w-20 h-20 mb-2">
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
        />
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
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
