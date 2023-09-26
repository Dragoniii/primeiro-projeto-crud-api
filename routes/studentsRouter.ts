import { Router } from "express";
import {
    studentsRoot,
    addStudent,
    studentsList,
    updateStudent,
    deleteStudentByQuery
} from "../controllers/studentsController";


const studentsRouter = Router();

studentsRouter.get("/", studentsRoot);

studentsRouter.post("/addStudent", addStudent);

studentsRouter.get("/studentsList", studentsList);

studentsRouter.put("/updateStudent", updateStudent);

studentsRouter.delete("/deleteStudent", deleteStudentByQuery);

export default studentsRouter;