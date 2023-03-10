import Task from "../models/Task.model.js";

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const create_task = async (req, res) => {
  const task = new Task({ ...req.body, author: req.user._id });

  try {
    await task.save();

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json(err);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const get_tasks = async (req, res) => {
  try {
    const tasks = await Task.find({ author: req.user._id });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const get_task = async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, author: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).send();
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const update_task = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ message: "Invalid updates!" });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!task) {
      return res.status(404).json({});
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(400).json(err);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const delete_task = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!task) {
      res.status(404).send();
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};
