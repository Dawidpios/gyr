import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/components/ui/card";
import { FridgeSideBar } from "./FridgeSideBar/FridgeSideBar";
import prisma from "@lib/prisma";
import ControlPanel from "./controlPanel/controlPanel";
import { updateItemQuantity, deleteItem } from "./controlPanel/fridgeHelpers";
import { getServerSession } from "next-auth";
import { authOptions } from "@components/lib/authOptions";
import { notFound } from "next/navigation";

type Product = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

const categories = [
  { value: "dairy", label: "Dairy 🥛" },
  { value: "fruits", label: "Fruits 🍎" },
  { value: "vegetables", label: "Vegetables 🥦" },
  { value: "meat", label: "Meat 🥩" },
  { value: "frozen", label: "Frozen 🧊" },
  { value: "beverages", label: "Beverages 🥤" },
  { value: "snacks", label: "Snacks 🍪" },
  { value: "other", label: "Other 📦" },
];

export default async function FridgePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    notFound();
  }

  const getFridgeItems = async () => {
    return await prisma.fridgeItem.findMany({
      where: {
        fridge: {
          userId: session?.user?.id as string,
        },
      },
      orderBy: {
        name: "asc",
      },
    });
  };

  const getFridge = async () => {
    return await prisma.fridge.findFirst({
      where: {
        userId: session?.user?.id as string,
      },
    });
  };
  const fridge = await getFridge();
  const products = await getFridgeItems();

  return (
    <div className="w-full flex flex-col-reverse sm:flex-row">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <h1 className="mt-6 mb-6 text-3xl font-bold italic text-primary-accent">My Fridge</h1>
        </div>
        <div className="flex flex-wrap gap-6">
          {!products ||
            (products.length === 0 && (
              <div className="w-100">
                Your fridge is empty. Add your first item!
              </div>
            ))}
          {products.map((product: Product) => (
            <Card
              key={product.id}
              className="w-full lg:w-fit relative flex flex-col border-border-muted hover:shadow-[0_0_5px_oklch(0.93_0.13_99.0)] transition-shadow duration-300"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="italic">{product.name}</CardTitle>
                  <div className="rounded-full bg-secondary-accent px-2 py-1 text-xs font-medium">
                    {categories
                      .find((c) => c.value === product.category)
                      ?.label.split(" ")[1] || "📦"}
                  </div>
                </div>
                <CardDescription>Quantity: {product.quantity}</CardDescription>
              </CardHeader>
              <ControlPanel
                id={product?.id || ""}
                updateItemQuantity={updateItemQuantity}
                deleteItem={deleteItem}
              />
            </Card>
          ))}
        </div>
      </div>
      <FridgeSideBar categories={categories} id={fridge?.id || ""} />
    </div>
  );
}
