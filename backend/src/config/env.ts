import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().default('development-secret'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  AUTH_DISABLED: z.string().default('true'),
  AI_PROVIDER: z.enum(['openai', 'gemini', 'claude', 'local']).default('local'),
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().default('gpt-4o-mini'),
  GEMINI_API_KEY: z.string().optional(),
  GEMINI_MODEL: z.string().default('gemini-1.5-pro'),
  CLAUDE_API_KEY: z.string().optional(),
  CLAUDE_MODEL: z.string().default('claude-3-5-sonnet-latest'),
  CORS_ORIGIN: z.string().default('*'),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),
  GENERATED_OUTPUT_DIR: z.string().default('./generated'),
  FRONTEND_ORIGIN: z.string().default('http://localhost:4000')
});

export const env = envSchema.parse(process.env);
