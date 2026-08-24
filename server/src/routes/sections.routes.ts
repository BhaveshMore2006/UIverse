import { Router, Request, Response } from 'express';
import { Section } from '../models/section.model';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const sections = await Section.find().sort({ createdAt: -1 });
    res.json({ ok: true, data: sections });
  } catch (err) {
    res.status(500).json({ ok: false, error: { message: 'Failed to fetch sections' }});
  }
});

router.get('/:sectionId', async (req: Request, res: Response) => {
  try {
    const section = await Section.findOne({ sectionId: req.params.sectionId });
    if (!section) {
       res.status(404).json({ ok: false, error: { message: 'Section not found' }});
       return;
    }
    res.json({ ok: true, data: section });
  } catch (err) {
    res.status(500).json({ ok: false, error: { message: 'Failed to fetch section' }});
  }
});

export default router;
