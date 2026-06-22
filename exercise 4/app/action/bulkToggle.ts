"use server";

import { ObjectId } from "mongodb";
import { GetTodoCollection } from "../lib/db";
import { revalidatePath } from "next/cache";

export async function bulkToggle(ids: string[], completed: boolean) {
  if (!ids || ids.length === 0) return;

  const collection = await GetTodoCollection();

  await collection.updateMany(
    { _id: { $in: ids.map((id) => new ObjectId(id)) } },
    { $set: { completed } }
  );

  revalidatePath("/");
}