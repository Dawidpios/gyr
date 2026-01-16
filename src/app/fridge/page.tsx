import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/components/ui/card";
import {
  SidebarInset,
  SidebarProvider,
} from "@components/components/ui/sidebar";
import { FridgeSideBar } from "./FridgeSideBar/FridgeSideBar";
import prisma from "@lib/prisma";
import ControlPanel from "./controlPanel/controlPanel";
import { updateItemQuantity, deleteItem } from "./controlPanel/fridgeHelpers";
import { getServerSession } from "next-auth";
import { authOptions } from "@components/lib/authOptions";
import { notFound } from "next/navigation";
import AddItemButton from "./FridgeSideBar/AddItemButton";

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
    <SidebarProvider>
      <SidebarInset>
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <h1 className="mb-6 text-3xl font-bold">My Fridge</h1>
            <AddItemButton />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {!products ||
              (products.length === 0 && (
                <div className="w-100">
                  Your fridge is empty. Add your first item!
                </div>
              ))}
            {products.map((product: Product) => (
              <Card key={product.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{product.name}</CardTitle>
                    <div className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
                      {categories
                        .find((c) => c.value === product.category)
                        ?.label.split(" ")[1] || "📦"}
                    </div>
                  </div>
                  <CardDescription>
                    Quantity: {product.quantity}
                  </CardDescription>
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
      </SidebarInset>
      <FridgeSideBar categories={categories} id={fridge?.id || ""} />
    </SidebarProvider>
  );
}
