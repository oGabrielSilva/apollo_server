import 'dotenv/config';
import e from 'express';
import mongoose from 'mongoose';
import Router from './Routes/Routes';

const app = e();

mongoose
  .connect(process.env.CONNECTSTRING as string)
  .then(() => app.emit('db'))
  .catch((e) => console.log('Mongoose connect error', e.message));

app.use(e.urlencoded({ extended: true }));
app.use(e.json());

app.use(Router);

app.listen(process.env.PORT, () =>
  console.log(`Server on: http://127.0.0.1:${process.env.PORT}`),
);
