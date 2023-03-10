import express from "express";
const router = express.Router();

import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

import {
  create_user,
  upload_avatar,
  login,
  logout,
  logout_all,
  get_my_info,
  get_my_avatar,
  update_user,
  delete_user,
  delete_avatar,
} from "../controllers/user.js";

/********************** POST ROUTES ************************/

/**
 * Post request creates a New User
 */
router.post("/", create_user);

/**
 * Post request adds an Avatar to an authenticated User
 */
router.post(
  "/me/avatar",
  auth,
  upload.single("avatar"),
  upload_avatar,
  (error, req, res, next) => {
    res.status(400).json({ error: error.message });
  }
);

/**
 * Post request returns User information along with new authentication token
 * if given an existing/matching email and password
 */
router.post("/login", login);

/**
 * Post request deletes an authentication token
 */
router.post("/logout", auth, logout);

/**
 * Post request deletes all users authentication tokens
 */
router.post("/logoutall", auth, logout_all);

/********************** GET ROUTES ************************/

/**
 * Get request returns user information (name, email)
 */
router.get("/me", auth, get_my_info);

/**
 * Get request returns users avatar
 */
router.get("/me/avatar/:id", get_my_avatar);

/********************** PATCH ROUTES ************************/

/**
 * Patch requests updates user object
 */
router.patch("/me", auth, update_user);

/********************** DELETE ROUTES ************************/

/**
 * Delete requests deletes a user
 */
router.delete("/me", auth, delete_user);

/**
 * Delete requests deletes users avatar
 */
router.delete("/me/avatar", auth, delete_avatar);

export default router;
