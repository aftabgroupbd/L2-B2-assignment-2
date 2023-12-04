import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

// use user routes into app 
app.use('/api/users',UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success:true,
    message:'Dear Sir, You have arrived at my assignment number two.'
  })
});

export default app;
