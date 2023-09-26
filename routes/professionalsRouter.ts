import { Router } from "express";
import {
    professionalsRoot,
    addProfessional,
    professionalsList,
    updateProfessional,
    deleteProfessionalByQuery
} from "../controllers/professionalsController";


const professionalsRouter = Router();

professionalsRouter.get("/", professionalsRoot);

professionalsRouter.post("/addProfessional", addProfessional);

professionalsRouter.get("/professionalsList", professionalsList);

professionalsRouter.put("/updateProfessional", updateProfessional);

professionalsRouter.delete("/deleteProfessional", deleteProfessionalByQuery);

export default professionalsRouter;