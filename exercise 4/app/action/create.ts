'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTodo } from "../lib/todo";

export async function createTodoAction(formData: FormData) {
  const title = formData.get('title') as string;

  if (!title || title.trim().length === 0) {
    console.error('Title is required');
    return;
  }

  if (title.length > 200) {
    console.error('Title must be less than 200 characters');
    return;
  }

  const todoId = await createTodo({ title: title.trim() });

  if (!todoId) {
    console.error('Failed to create todo');
    return;
  }

  revalidatePath('/');
  redirect('/');
}
