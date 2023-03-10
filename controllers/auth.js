import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";

import User from "../models/User.js";

import { JWT_SECRET } from "../constants/environment.js";

// REGISTER USER

export const register = async (req, res) => {
  try {
    const {firstName,lastName,email,password,friends,location,occupation, picturePath} = req.body;

    // CHECK EMAIL

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "EMAIL already existed." });


    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGGING IN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exits." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
    console.log("token -----------------")
    const token =  jwt.sign({ id: user._id }, JWT_SECRET);
   
    console.log("token....: ", token)

    delete user._doc.password
//    const newUser =  _.omit(user._doc, ['password']);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
