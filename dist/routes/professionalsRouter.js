"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const professionalsController_1 = require("../controllers/professionalsController");
const professionalsRouter = (0, express_1.Router)();
professionalsRouter.get("/", professionalsController_1.professionalsRoot);
professionalsRouter.post("/addProfessional", professionalsController_1.addProfessional);
professionalsRouter.get("/professionalsList", professionalsController_1.professionalsList);
professionalsRouter.put("/updateProfessional", professionalsController_1.updateProfessional);
professionalsRouter.delete("/deleteProfessional", professionalsController_1.deleteProfessionalByQuery);
exports.default = professionalsRouter;
