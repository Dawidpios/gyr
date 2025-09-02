"use client";
import { useSidebar } from "@components/components/ui/sidebar";
import { Plus } from "lucide-react";

const AddItemButton = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      className="md:hidden mb-4 mr-6 flex items-center gap-2 bg-black p-3 rounded-xl"
      onClick={toggleSidebar}
    >
      <Plus className="w-6 h-6 text-white size-xl" />
    </button>
  );
};

export default AddItemButton;
