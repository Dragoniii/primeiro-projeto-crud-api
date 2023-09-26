import express from "express";
import dotenv from "dotenv";
import professionalsRouter from "../routes/professionalsRouter";
import studentsRouter from "../routes/studentsRouter";
import supportsITRouter from "../routes/supportsITRouter";
import cors from "cors";


dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome");
});

app.use("/students", studentsRouter);
app.use("/professionals", professionalsRouter);
app.use("/supportsITR", supportsITRouter);

app.listen(port, () => {
    console.log("Connection with SQLite has been estabilished");
    console.log(`Servidor escutando na porta ${port}`);
})
