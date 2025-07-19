"use client";
import { useState } from "react";
import { Input } from "@components/components/ui/input";
import { CirclePlus, CircleMinus, Trash, PackagePlus } from "lucide-react";

interface ControlPanelProps {
  id: string;
  updateItemQuantity: (itemId: string, itemQuantity: number) => Promise<void>;
  deleteItem: (itemId: string) => Promise<void>;
}

const ControlPanel = ({
  id,
  updateItemQuantity,
  deleteItem,
}: ControlPanelProps) => {
  const [inputValue, setInputValue] = useState<number>(0);

  const increment = () => {
    setInputValue((prev) => prev + 1);
  };

  const decrement = () => {
    if (inputValue > 0) {
      setInputValue((prev) => prev - 1);
    }
  };

  const deleteItemHandler = () => {
    deleteItem(id);
    setInputValue(0);
  };

  const updateItemQuantityHandler = () => {
    if (inputValue > 0) {
      updateItemQuantity(id, inputValue);
      setInputValue(0);
    }
  };



  return (
    <div className="w-full flex items-start p-4 gap-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <CirclePlus className="cursor-pointer" onClick={increment} />
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
            type="number"
            placeholder="Quantity"
            className="w-1/3 max-w-sm"
          />
          <CircleMinus
            style={{ display: inputValue > 0 ? "block" : "none" }}
            className="cursor-pointer"
            onClick={decrement}
          />
          <PackagePlus
            className={`mr-auto cursor-pointer rounded-md text-2xl ${
              !inputValue ? "opacity-50" : ""
            }`}
            onClick={updateItemQuantityHandler}
          ></PackagePlus>
        </div>
      </div>
      <Trash
        className="ml-auto cursor-pointer self-start"
        onClick={deleteItemHandler}
      />
    </div>
  );
};

export default ControlPanel;
