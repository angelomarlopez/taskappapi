import sharp from "sharp";

import User from "../models/User.model.js";

import {
  send_welcome_email,
  send_cancelation_email,
} from "../controllers/email.js";

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const create_user = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    send_welcome_email(user.email, user.name);

    const token = await user.generateAuthToken();

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json(err);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const upload_avatar = async (req, res) => {
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();
  req.user.avatar = buffer;

  await req.user.save();

  res.status(200).json({});
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: "Unable to login" });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();

    res.status(200).send();
  } catch (err) {
    res.status(404).json({ error: "" });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const logout_all = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (err) {
    res.status(500).send();
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const get_my_info = async (req, res) => {
  res.status(200).json(req.user);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const get_my_avatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (err) {
    res.status(404).send();
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const update_user = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ message: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();

    res.status(200).json(req.user);
  } catch (err) {
    res.status(400).json(err);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const delete_user = async (req, res) => {
  try {
    await req.user.remove();

    send_cancelation_email(req.user.email, req.user.name);

    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).send();
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const delete_avatar = async (req, res) => {
  try {
    req.user.avatar = undefined;

    await req.user.save();

    res.status(200).send();
  } catch (err) {
    res.status(500).send();
  }
};
