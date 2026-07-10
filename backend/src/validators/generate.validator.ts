import { z } from 'zod';

export const generateSchema = z.object({
  prompt: z.string().trim().min(10, 'Prompt must be at least 10 characters long').max(2400)
});

export const projectIdSchema = z.object({
  id: z.string().uuid('Project ID must be a valid UUID').or(z.literal('demo-presentation-fallback'))
});

export const publishSchema = z.object({
  url: z.string().url('Publish URL must be a valid URL').optional()
});

export const exportSchema = z.object({
  format: z.enum(['html', 'zip']).default('html')
});
