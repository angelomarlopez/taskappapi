import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

// App Routers
import UserRouter from "./routes/user.routes.js";
import TaskRouter from "./routes/task.routes.js";

// Initial Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/user", UserRouter);
app.use("/task", TaskRouter);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server Running on PORT: ${process.env.PORT}`)
    );
  })
  .catch((error) =>
    console.error(`Failed to connect to MongoDB Atlas. \n${error}`)
  );
