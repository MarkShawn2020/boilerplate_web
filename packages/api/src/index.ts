import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as authRouter } from './routes/auth';
import { router as keysRouter } from './routes/keys';
import { router as solutionsRouter } from './routes/solutions';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/keys', keysRouter);
app.use('/api/solutions', solutionsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
