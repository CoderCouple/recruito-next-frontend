import { createEnv } from "@t3-oss/env-nextjs";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config());

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "production"]),
    DB_HOST: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
    DB_PORT: z.coerce.number(),
    DATABASE_URL: z.string().url(),
    DB_MIGRATING: z
      .string()
      .refine((s) => s === "true" || s === "false")
      .transform((s) => s === "true")
      .optional(),
  },
  onValidationError: (issues) => {
    console.error("❌ Invalid environment variables:", issues);
    process.exit(1);
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  // eslint-disable-next-line n/no-process-env
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  // Makes it so that empty strings are treated as undefined.
  emptyStringAsUndefined: true,

  // eslint-disable-next-line n/no-process-env
  experimental__runtimeEnv: process.env,
});
