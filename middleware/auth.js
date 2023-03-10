import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import User from "../models/User.model.js";

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const auth = async (req, res, next) => {
  try {
    const token = req
      .header("Authorization")
      .replace(`${process.env.SECRET_KEY} `, "");
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) throw new Error("Unable to Authenticate");

    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ error: "Please Authenticate." });
  }
};

export default auth;
