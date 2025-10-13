"use server";

import { auth, signOut } from "@/auth";

export async function handleLogout() {
  await signOut();
}

export async function getSession() {
  const session = await auth();
  return session;
}
