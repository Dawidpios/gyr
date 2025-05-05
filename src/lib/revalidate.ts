'use server'
import { revalidatePath } from "next/cache"

const revalidate = async (url: string) => {
  revalidatePath(url)
}

export default revalidate