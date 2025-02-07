"use server";

import { cookies } from "next/headers";

export async function logout() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token")
    return
  } catch (error) {
    console.error("Error logging out:", error);
  }
}
