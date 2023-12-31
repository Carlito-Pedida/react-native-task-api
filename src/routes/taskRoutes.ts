import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  toggleTask
} from "../controllers/taskController";

const router = Router();

router.get("/", getAllTasks);

router.post("/", createTask);

router.put("/:titleId", toggleTask);

router.delete("/:titleId", deleteTask);

export default router;
