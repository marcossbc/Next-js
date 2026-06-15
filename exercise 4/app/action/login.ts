"use server"

import { cookies } from "next/headers";

export async function login(formData: FormData) {
  const role = formData.get('role') as string;

   (await cookies()).set('auth', 'true');
    (await cookies()).set('role', role);



}