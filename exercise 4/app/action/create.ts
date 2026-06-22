"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTodo } from "../lib/todo";

export async function createTodoAction(prevState: any, formData: FormData) {

  const title = formData.get("title") as string;
  const priority = formData.get("priority") as string;

  if (!title || title.trim() === "") {
    return { error: "Title is required" };
  }

  await createTodo({
    title: title.trim(),
    priority: (priority as "low" | "medium" | "high") || "medium",
  });

  revalidatePath("/");
  redirect("/");
}