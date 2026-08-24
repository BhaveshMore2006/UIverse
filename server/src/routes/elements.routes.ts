import { Router, Request, Response } from 'express';
import { Element } from '../models/element.model';
import { z } from 'zod';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { sectionId, pageName } = req.query;
    
    const query: any = {};
    if (sectionId) query.sectionId = sectionId;
    if (pageName) query.pageName = pageName;

    const elements = await Element.find(query);
    res.json({ ok: true, data: elements });
  } catch (err) {
    res.status(500).json({ ok: false, error: { message: 'Failed to fetch elements' }});
  }
});

const updateSchema = z.object({
  content: z.string().optional(),
  css: z.string().optional(),
  loop: z.array(z.any()).optional(),
});

router.patch('/:fieldId', async (req: Request, res: Response) => {
  try {
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ ok: false, error: { message: 'Invalid update payload' }});
      return;
    }

    const updated = await Element.findOneAndUpdate(
      { fieldId: req.params.fieldId },
      { $set: parsed.data },
      { new: true }
    );

    if (!updated) {
       res.status(404).json({ ok: false, error: { message: 'Element not found' }});
       return;
    }

    res.json({ ok: true, data: updated });
  } catch (err) {
    res.status(500).json({ ok: false, error: { message: 'Failed to update element' }});
  }
});

export default router;
