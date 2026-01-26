"use client";
import { useState } from "react";
import { Input } from "@components/components/ui/input";
import { Plus, Minus, Trash2, PackagePlus } from "lucide-react";
import { Button } from "@components/components/ui/button";

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
    if(inputValue <= 0) return;
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
    <div className="m-2 w-full flex items-start pb-4 gap-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center flex-wrap gap-2 mb-4">
          <Button className=" bg-primary-accent font-bold text-lg cursor-pointer hover:bg-primary-accent-hover" onClick={increment}>
             <Plus />
          </Button>
         
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
            type="number"
            placeholder="Quantity"
            className="w-1/3 max-w-sm"
          />
          <Button className=" bg-primary-accent font-bold text-lg cursor-pointer hover:bg-primary-accent-hover" onClick={decrement} variant="outline" disabled={inputValue === 0}>
            <Minus
            style={{
              color:
                inputValue === 0
                  ? "var(--color-text-muted)"
                  : "var(--color-text-primary)",
            }}
          />
          </Button>
          
        </div>
        <button
          className={`absolute w-fit text-xs bg-primary-accent text-main font-bold bottom-2 left-2 mt-2 inline cursor-pointer rounded-md p-2 ${
            !inputValue ? "opacity-50" : ""
          }`}
          onClick={updateItemQuantityHandler}
        > 
          Increment product quantity
          <PackagePlus className="inline m-1"></PackagePlus>
        </button>
      </div>
      <Trash2
        className="absolute w-5 h-5 text-red-600 bottom-2 right-2 cursor-pointer hover:text-red-800"
        onClick={deleteItemHandler}
      />
    </div>
  );
};

export default ControlPanel;
