import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate } from '../middleware/auth';

export const router = Router();

const keySchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// List all keys for the authenticated user
router.get('/', authenticate, async (req, res) => {
  try {
    const keys = await prisma.key.findMany({
      where: { userId: req.user.id },
      select: {
        id: true,
        name: true,
        description: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
        // Don't send the actual value
        value: false,
      },
    });
    res.json(keys);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new key
router.post('/', authenticate, async (req, res) => {
  try {
    const data = keySchema.parse(req.body);
    const key = await prisma.key.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });
    res.status(201).json(key);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Revoke a key
router.post('/:id/revoke', authenticate, async (req, res) => {
  try {
    const key = await prisma.key.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!key) {
      return res.status(404).json({ error: 'Key not found' });
    }

    await prisma.key.update({
      where: { id: req.params.id },
      data: { revoked: true },
    });

    res.json({ message: 'Key revoked successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
