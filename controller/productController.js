import productModel from "../model/productModel";
import fetch from "node-fetch";

export const defaultData = async () => {
  try {
    const productData = await fetch("https://dummyjson.com/products");
    //console.log("product",productData);

    if (!productData.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const result = await productData.json();
    //rconsole.log({ result });

    await productModel.deleteMany({})
    const product = result.products.map((item) => ({
        id: item['id'],
        title: item['title'],
        description:item['description'],
        price: item['price'],
        rating: item['rating'],
        image: item['thumbnail'],
        category : item['category']
    }));
    
   
     const data = await productModel.insertMany(product)
     //console.log("data",data);
    // const storeData = new productModel({
    //     id : result.id,
    //     title:result.title,
    //     description : result.description,
    //     price : result.price,
    //     rating : result.rating,
    //     image : result.thumbnail,

    // })

    //storeData.save();
  } catch (error) {
    return res.send(error)
    //console.log("error", error);
  }
};
export const getAllProducts = async (req,res) => {
  try {
    const producstdata = await productModel.find();
   // console.log(producstdata + "data mila hain");
     return res.status(201).json(producstdata);
  } catch (error) {
    return res.send(error)
   // console.log("error", error);
  }
};
