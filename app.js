
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './router/authRouter';
import dotenv from 'dotenv';
import { defaultData } from './controller/productController';
import productRouter from './router/productRouter';
import cartRouter from './router/cartRouter';


dotenv.config();

const app = express();
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
  }
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/user', authRouter);
app.use('/api/products',productRouter)
app.use('/api/addtocart',cartRouter)
app.use('/api/removefromcart',cartRouter)
app.use('/api',cartRouter)
app.use('/api/checkout',cartRouter);
const port = process.env.PORT || 7000
mongoose.connect(process.env.MONGO_URL)
.then(()=> app.listen(port , ()=> console.log(`Connected TO Database and Listening TO Localhost ${port}`)))
.catch((err)=>console.log(err))


defaultData();
