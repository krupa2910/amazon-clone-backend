import express from "express";
import { addtocart, checkout, getAllCartItems, removefromcart, updatecartItem } from "../controller/cartController";

const cartRouter = express.Router();


cartRouter.post('/cartItem',addtocart)
cartRouter.delete('/removeItem/:userId/:itemId',removefromcart)
cartRouter.get('/getCartItems/:id',getAllCartItems)
cartRouter.put('/updatecartItem',updatecartItem)
cartRouter.post('/payment',checkout)
export default cartRouter;