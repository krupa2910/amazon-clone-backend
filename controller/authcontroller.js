import userModel from "../model/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
   // console.log("==>", req.body);
    let user = await userModel.findOne({ email }).then((res) => {
      ///console.log("res", res);
    });

    if (user) {
      return res.status(400).send("That user already exisits!");
    } else {
      // generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      let hashpassword = await bcrypt.hash(password, salt);
      let token = jwt.sign(
        {
          email,
        },
        "secret",
        { expiresIn: 60 * 1000 }
      );
     // console.log("token =>", token);
      let newUser = new userModel({
        name: name,
        email: email,
        phone: phone,
        password: hashpassword,
        token: token,
        type: "Success",
      });
     // console.log("newUser", newUser);
      newUser.save();
      return res
        .status(200)
        .json({ message: "User added Successfully!!", newUser });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
   // console.log("==>", req.body);
    let existingUser;

    existingUser = await userModel.findOne({ email });
   // console.log("existingUser", existingUser);

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "Couldnt Find User By This Email" });
    } else {
      const isPasswordCorrect = bcrypt.compareSync(
        password,
        existingUser.password
      );
     // console.log("isPasswordCorrect", isPasswordCorrect);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" });
      }

      return res
        .status(200)
        .json({ message: "Login Successfull", user: existingUser });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

export const getAllUsers = (req, res) => {};
