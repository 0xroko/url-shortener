import { isAuthorized } from "@/lib/auth";
import env from "@/lib/env";
import { randomString } from "@/lib/helpers";
import { z } from "zod";

const nonEmptyString = (name: string) =>
  z.string().min(1, { message: `${name} is required!` });

export const urlEntityShema = z.object({
  url: nonEmptyString("URL")
    .url({ message: "Invalid URL!" })
    .refine(
      (data) => {
        try {
          const url = new URL(data);
          if (env.DISALLOWED_DOMAINS.includes(url.hostname)) {
            return false;
          }
        } catch (error) {
          return false;
        }
        return true;
      },
      { message: "Domain is not allowed!" },
    ),
  slug: z
    .string()
    .max(20)
    .transform((t) => {
      if (t === "") {
        return randomString(6);
      }
      return t.toLowerCase();
    }),
  password: z.string().refine(
    (key) => {
      if (isAuthorized()) {
        return true;
      }
      if (key === env.PASSWORD) {
        return true;
      }
      return false;
    },
    { message: "Invalid password!" },
  ),
});

export const redirectLoaderSchema = nonEmptyString("Slug");
