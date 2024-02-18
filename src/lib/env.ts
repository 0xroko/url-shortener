// @ts-check
import { z } from "zod";

/*eslint sort-keys: "error"*/
const envSchema = z.object({
  APP_URL: z.string(),
  DISALLOWED_DOMAINS: z.string().transform((value) => value.split(",")),
  KV_REST_API_READ_ONLY_TOKEN: z.string(),
  KV_REST_API_TOKEN: z.string(),
  KV_REST_API_URL: z.string(),
  KV_URL: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  PASSWORD: z.string(),
  PASSWORD_COOKIE_VALUE: z.string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  throw new Error(
    "❌ Invalid environment variables: " +
      JSON.stringify(env.error.format(), null, 4),
  );
}

export default env.data;
