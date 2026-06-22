"use server";

import { redirect } from "next/navigation";

export async function searchTodo(formData: FormData) {

  const search = formData.get("search") as string;

  if (!search || search.trim() === "") {
    redirect("/");
  }

  redirect(`/?search=${search}`);

}