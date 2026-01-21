"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Category, Member } from "../lib/types";

// Modal state management
interface ModalState {
  createMember: boolean;
  deleteMember: boolean;
  createCategory: boolean;
  deleteCategory: boolean;
  createPromotion: boolean;
  deletePromotion: boolean;
  createGalleryItem: boolean;
  deleteGalleryItem: boolean;
  createWelfareItem: boolean;
  deleteWelfareItem: boolean;
}

interface ModalDataState {
  editingMember: Member | null;
  selectedMemberIds: string[];
  editingCategory: Category | null;
  selectedCategoryIds: string[];
  editingGalleryItem: Record<string, unknown> | null;
  selectedGalleryItemIds: string[];
  editingWelfareItem: Record<string, unknown> | null;
  selectedWelfareItemIds: string[];
}

// Context type
interface ModalContextType {
  modals: ModalState;
  modalData: ModalDataState;
  openModal: (modalName: keyof ModalState) => void;
  closeModal: (modalName?: keyof ModalState) => void;
  setModalData: (key: keyof ModalDataState, value: unknown) => void;
}

// Create context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
}

interface ModalProviderProps {
  children: ReactNode;
}

// Modal provider
export function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<ModalState>({
    createMember: false,
    deleteMember: false,
    createCategory: false,
    deleteCategory: false,
    createPromotion: false,
    deletePromotion: false,
    createGalleryItem: false,
    deleteGalleryItem: false,
    createWelfareItem: false,
    deleteWelfareItem: false,
  });

  const [modalData, setModalDataState] = useState<ModalDataState>({
    editingMember: null,
    selectedMemberIds: [],
    editingCategory: null,
    selectedCategoryIds: [],
    editingGalleryItem: null,
    selectedGalleryItemIds: [],
    editingWelfareItem: null,
    selectedWelfareItemIds: [],
  });

  const openModal = (modalName: keyof ModalState) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName?: keyof ModalState) => {
    if (!modalName) return;
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const setModalData = (key: keyof ModalDataState, value: unknown) => {
    setModalDataState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ModalContext.Provider value={{ modals, modalData, openModal, closeModal, setModalData }}>
      {children}
    </ModalContext.Provider>
  );
}
