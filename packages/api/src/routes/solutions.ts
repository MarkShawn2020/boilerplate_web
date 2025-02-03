import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate } from '../middleware/auth';

export const router = Router();

const solutionSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  keyIds: z.array(z.string()),
});

// List all solutions for the authenticated user
router.get('/', authenticate, async (req, res) => {
  try {
    const solutions = await prisma.solution.findMany({
      where: { userId: req.user.id },
      include: {
        keys: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });
    res.json(solutions);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new solution
router.post('/', authenticate, async (req, res) => {
  try {
    const data = solutionSchema.parse(req.body);
    
    // Verify all keys belong to the user
    const keys = await prisma.key.findMany({
      where: {
        id: { in: data.keyIds },
        userId: req.user.id,
      },
    });

    if (keys.length !== data.keyIds.length) {
      return res.status(400).json({ error: 'Invalid key IDs provided' });
    }

    const solution = await prisma.solution.create({
      data: {
        name: data.name,
        description: data.description,
        userId: req.user.id,
        keys: {
          connect: data.keyIds.map(id => ({ id })),
        },
      },
      include: {
        keys: true,
      },
    });

    res.status(201).json(solution);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get solution with all active keys
router.get('/:id/env', authenticate, async (req, res) => {
  try {
    const solution = await prisma.solution.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
      include: {
        keys: {
          where: {
            revoked: false,
          },
        },
      },
    });

    if (!solution) {
      return res.status(404).json({ error: 'Solution not found' });
    }

    const envVars = solution.keys.reduce((acc, key) => {
      acc[key.name] = key.value;
      return acc;
    }, {} as Record<string, string>);

    res.json(envVars);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
