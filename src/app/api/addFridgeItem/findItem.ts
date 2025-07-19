import prisma from "@components/lib/prisma";

export default async function findItem(name: string, fridgeId: string) {
  try {
    const item = await prisma.fridgeItem.findFirst({
      where: {
        name: name,
        fridgeId: fridgeId,
      },
    });
    if (item) {
      return true;
    }
    return false;
  } catch (err) {
    console.error("Error finding item:", err);
    return false;
  }
}
