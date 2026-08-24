import { Request, Response } from 'express';
import { z } from 'zod';
import mongoose from 'mongoose';
import { getNextId } from '../utils/id-generator';
import { Section } from '../models/section.model';
import { Element } from '../models/element.model';

const generateSchema = z.object({
  mode: z.enum(['wireframe', 'code', 'prompt', 'combined']),
  prompt: z.string().optional(),
  code: z.string().optional(),
  pageName: z.string().default('Home'),
  sectionName: z.string().default('Custom'),
  accentColor: z.string().optional(),
});

export const generateController = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = generateSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ ok: false, error: { code: 'INVALID_INPUT', message: 'Invalid payload' }});
      return;
    }

    // For now, return an error message as LLM is not connected
    res.status(503).json({ 
      ok: false, 
      error: { 
        code: 'LLM_NOT_CONNECTED', 
        message: 'LLM not connected' 
      }
    });

  } catch (error) {
    console.error('Generation Error:', error);
    res.status(500).json({ ok: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to generate section' }});
  }
};
