import { passwordCookieName } from "@/lib/const";
import env from "@/lib/env";
import { cookies } from "next/headers";

export const isAuthorized = () => {
  const authCookieValue = cookies().get(passwordCookieName)?.value;
  if (authCookieValue !== env.PASSWORD_COOKIE_VALUE) {
    return false;
  }
  return true;
};

export const authorize = (formData: FormData) => {
  const password = formData.get("password")?.toString();
  if (password === env.PASSWORD) {
    cookies().set(passwordCookieName, env.PASSWORD_COOKIE_VALUE, {
      sameSite: "strict",
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    });
    return true;
  }
  return false;
};
