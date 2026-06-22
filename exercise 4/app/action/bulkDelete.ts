"use server";

import { ObjectId } from "mongodb";
import { GetTodoCollection } from "../lib/db";
import { revalidatePath } from "next/cache";

export async function bulkDelete(ids: string[]) {
  if (!ids || ids.length === 0) return;

  const collection = await GetTodoCollection();

  await collection.deleteMany({
    _id: { $in: ids.map((id) => new ObjectId(id)) },
  });

  revalidatePath("/");
}