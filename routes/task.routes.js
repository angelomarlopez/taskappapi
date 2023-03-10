import express from "express";
const router = express.Router();

import auth from "../middleware/auth.js";

import {
  create_task,
  get_tasks,
  get_task,
  update_task,
  delete_task,
} from "../controllers/task.js";

/********************** POST ROUTES ************************/

/**
 * Post request creates a new task
 */
router.post("/", auth, create_task);

/********************** GET ROUTES ************************/

/**
 * Get requests returns all tasks by the user
 */
router.get("/", auth, get_tasks);

/**
 * Get requests returns a task with given id
 */
router.get("/:id", auth, get_task);

/********************** PATCH ROUTES ************************/

/**
 * Patch request updates task with given id
 */
router.patch("/:id", auth, update_task);

/********************** DELETE ROUTES ************************/

/**
 * Delete request deletes task with given id
 */
router.delete("/:id", auth, delete_task);

export default router;
