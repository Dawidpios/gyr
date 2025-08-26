"use server";
import { revalidatePath } from "next/cache";

const revalidate = async (url: string | string[]) => {
  if (Array.isArray(url)) {
    for (const path of url) {
      revalidatePath(path);
    }
  } else {
    revalidatePath(url);
  }
};

export default revalidate;
