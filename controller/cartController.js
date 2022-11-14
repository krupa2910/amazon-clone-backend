import cartSchema from "../model/cartSchema";
import productModel from "../model/productModel";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import userModel from "../model/userModel";

const stripe = new Stripe(
  "sk_test_51M1mU8SDnBmOuEAXSpcdtjS6SUx79AKoVySp4u5njLKfI24ddJrHzngs0tenEnWkYpWFcurIaXGD7hZno77N1LEd00KWda1FCp"
);

export const getAllCartItems = async (req, res) => {
  const userId = req.params.id;
  try {
    const cart = await cartSchema.findById({ _id: userId });
   // console.log("cart", cart);
    if (cart && cart.items.length > 0) {
      return res.status(201).json(cart);
    } else {
      return res.send(null);
    }
  } catch (err) {
   // console.log(err);
    res.status(500).send("Something went wrong");
  }
};

export const addtocart = async (req, res) => {
  const { itemId, userId, qty } = req.body;
 // console.log("req.body", itemId,userId);

  try {
    let cart = await cartSchema.findOne({ userId });
   // console.log("cart", cart);
    let item = await productModel.findOne({ _id: itemId });
   // console.log("===>", item);
    if (!item) {
      res.status(404).send("Item not found!");
    }
    const price = item.price;
    const name = item.title;
    const image = item.image;
    const rating = item.rating;
    const quantity = item.quantity;
    // const quantity = Qty + 1;
    if (cart) {
      // if cart exists for the user

      cart.items.push({ itemId, name, price, image, rating, quantity });

      //cart.bill += item.quantity*price;
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      const newCart = await cartSchema.create({
        userId,
        items: [{ itemId, name, price, image, rating, quantity }],
        //rbill: quantity*price
      });
      return res.status(201).send(newCart);
    }
  } catch (error) {
    return res.send(error)
    //console.log("error", error);
  }
};

export const removefromcart = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.itemId;
 // console.log("userId", userId, productId);
  try {
    let cart = await cartSchema.findOne({ userId });
   // console.log("cart.items", cart.items);
    const itemIndex = cart.items.findIndex((item) => item._id == productId);

    //console.log("Item", itemIndex);

    if (itemIndex > -1) {
      let item = cart.items[itemIndex];

      cart.items.splice(itemIndex, 1);
    
      cart = await cart.save();

      res.status(200).send(cart);
    } else {
      res.status(404).send("item not found");
    }
  } catch (err) {
   // console.log(err);
    res.status(500).send("Something went wrong");
  }
};

export const updatecartItem = async (req, res) => {
  const { userId, itemId, type } = req.body;
 // console.log("Qty", type,userId);
  try {
    let cart = await cartSchema.findOne({ userId});
   // console.log("cart", cart);

    if (cart) {
      let item = cart.items.find((p) => p._id == itemId);
      //console.log("item", item);
      let increment = "Increment";
      let decrement = "Decrement";
      if (item && type == increment) {
        item.quantity = item.quantity + 1;

        let cartItem = item.save({ suppressWarning: true });

        cart = await cart.save(cartItem);
        res.status(200).send(cart);
      }
      if (item && type == decrement) {
        item.quantity = item.quantity - 1;
        item.amount = item.price * item.quantity;
      //  console.log("item.amount==>", item.amount);
        let cartItem = item.save({ suppressWarning: true });

        cart = await cart.save(cartItem);
        res.status(200).send(cart);
      }
    } else {
      res.status(404).send("item not found");
    }
  } catch (error) {
    //console.log("error", error);
    res.status(500).send("Something went wrong");
  }
};

export const checkout = async (req, res) => {
  const { user, orderItem, total } = req.body;

 // console.log("itemwejkjl", orderItem);
  const idempotencyKey = uuidv4();
  try {

    const line_items = orderItem.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            images: [item.image],
            //description: item.desc,
            metadata: {
              id: item._id,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/card`,
    });

    res.send({ Url: session.url });
  } catch (error) {
    return res.send(error)
   // console.log("error", error);
  }
};
