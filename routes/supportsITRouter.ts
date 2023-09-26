import { Router } from "express";
import {
    supportsITRoot,
    addSupportIT,
    supportsITList,
    updateSupportIT,
    deleteSupportITByQuery
} from "../controllers/supportsITController";


const supportsITRouter = Router();

supportsITRouter.get("/", supportsITRoot);

supportsITRouter.post("/addSupportIT", addSupportIT);

supportsITRouter.get("/supportsITList", supportsITList);

supportsITRouter.put("/updateSupportIT", updateSupportIT);

supportsITRouter.delete("/deleteSupportIT", deleteSupportITByQuery);
export default supportsITRouter;