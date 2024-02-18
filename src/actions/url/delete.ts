"use server";

import { isAuthorized } from "@/lib/auth";
import { kv } from "@vercel/kv";

export const deleteLink = async (formData: FormData) => {
  if (isAuthorized() === false) return;
  const key = formData.get("key");
  if (key) await kv.del(key.toString());
};
