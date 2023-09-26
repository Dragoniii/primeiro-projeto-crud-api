import { Response, Request } from "express";
import Student from "../models/Student";
import { createDbConnection } from "../db/dbConfig";
import { Database } from "sqlite3";
import logger from "../services/logger";


let db: Database = createDbConnection();

const studentsRoot = (req: Request, res: Response) => {
    res.send("Página Inicial Students");
}

const addStudent = (req: Request, res: Response) => {
    logger.info(req);

    let token = req.headers.authorization;

    if (token == "Bearer 12345") {
        let student: Student = req.body;

        let sql = `INSERT INTO students(name, birthday, address, shift, year, room) VALUES ("${student.name}", "${student.birthday}", "${student.address}", "${student.shift}", "${student.year}", "${student.room}")`;

        if (student.name && student.birthday && student.address && student.shift && student.year && student.room) {
            db.run(sql,
                (error: Error) => {
                    if (error) {
                        res.end(error.message);
                    }
                    res.send(`Student ${student.name} Added`);
                })
        } else {
            res.send("Erro na criação do estudante. Verifique se todos os campos foram preenchidos");
        }
    } else {
        res.sendStatus(403);
    }



}

const studentsList = (req: Request, res: Response) => {


    let studentsList: Student[] = [];

    let sql = `SELECT * FROM students`;

    db.all(sql, [], (error: Error, rows: Student[]) => {
        if (error) {
            logger.error(error.message);
            res.send(error.message);
        }
        rows.forEach((row: Student) => { studentsList.push(row) });
        logger.info(req);
        res.send(studentsList);
    }
    );
}

const updateStudent = (req: Request, res: Response) => {
    logger.info(req);
    let student: Student = req.body;
    let roomToUppercase = student.room.toUpperCase();
    let sql = `UPDATE students SET name="${student.name}", 
                                   shift="${student.shift}", 
                                   year="${student.year}",
                                   room="${roomToUppercase}"
                                   WHERE id="${student.id}"
                                   `;


    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Student Updated");
    });
}

const deleteStudentByQuery = (req: Request, res: Response) => {
    logger.info(req);
    let id = req.query.id;
    let sql = `DELETE from students WHERE id="${id}"`;

    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Student Deleted");
    })
}





export {
    studentsRoot,
    addStudent,
    studentsList,
    updateStudent,
    deleteStudentByQuery
};