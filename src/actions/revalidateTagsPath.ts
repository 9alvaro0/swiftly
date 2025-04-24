"use server";

import { revalidatePath } from "next/cache";

export async function revalidateTagsPath() {
    revalidatePath("/admin/tags");
    return { success: true };
}
