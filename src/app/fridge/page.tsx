
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/components/ui/card"
import { SidebarInset, SidebarProvider } from "@components/components/ui/sidebar"
import {FridgeSideBar} from "./FridgeSideBar/FridgeSideBar"
import prisma from "@lib/prisma"

// Define product type
type Product = {
  id: string
  name: string
  quantity: number
  category: string
  expiryDate: Date | null
}


// Categories with emoji icons
const categories = [
  { value: "dairy", label: "Dairy 🥛" },
  { value: "fruits", label: "Fruits 🍎" },
  { value: "vegetables", label: "Vegetables 🥦" },
  { value: "meat", label: "Meat 🥩" },
  { value: "frozen", label: "Frozen 🧊" },
  { value: "beverages", label: "Beverages 🥤" },
  { value: "snacks", label: "Snacks 🍪" },
  { value: "other", label: "Other 📦" },
]

const getFridgeItems = async () => {
  return await prisma.fridgeItem.findMany()
}

export default async function FridgePage() {
  const products = await getFridgeItems();

  return (
    <SidebarProvider>
      <SidebarInset>
        <div className="container mx-auto p-4">
          <h1 className="mb-6 text-3xl font-bold">My Fridge</h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product: Product) => (
              <Card key={product.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{product.name}</CardTitle>
                    <div className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
                      {categories.find((c) => c.value === product.category)?.label.split(" ")[1] || "📦"}
                    </div>
                  </div>
                  <CardDescription>Quantity: {product.quantity}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Expires: {product.expiryDate ? format(product.expiryDate, "PPP") : "No expiry date"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>

      <FridgeSideBar categories={categories} />
    </SidebarProvider>
  );
}