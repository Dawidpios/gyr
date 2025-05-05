
import prisma from '@lib/prisma'



export async function getAllRecipes() {
  return await prisma.recipes.findMany();
}