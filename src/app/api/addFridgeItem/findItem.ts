import prisma from "@components/lib/prisma";

export default async function findItem(name: string) {
  try {
    const item = await prisma.fridgeItem.findFirst({
      where: {
        name: name
      }
    })
    if(item) {
      return true
    }
    return false
  } catch (err) { 
    console.error("Error finding item:", err);
    return false
  }
  
}