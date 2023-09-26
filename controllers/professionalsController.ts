import { Response, Request } from "express";
import Professional from "../models/Professional";
import { createDbConnection } from "../db/dbConfig";
import { Database } from "sqlite3";
import logger from "../services/logger";


let db: Database = createDbConnection();

const professionalsRoot = (req: Request, res: Response) => {
    res.send("Página Inicial Professionals");
}

const addProfessional = (req: Request, res: Response) => {
    logger.info(req);

    let token = req.headers.authorization;

    if (token == "Bearer 12345") {
        let professional: Professional = req.body;
        

        let sql = `INSERT INTO professionals(name, birthday, address, role, shift, sector) VALUES ("${professional.name}", "${professional.birthday}", "${professional.address}", "${professional.role}", "${professional.shift}", "${professional.sector}")`;

        if (professional.name && professional.birthday && professional.address && professional.role && professional.shift && professional.sector) {
            db.run(sql,
                (error: Error) => {
                    if (error) {
                        res.end(error.message);
                    }
                    res.send(`Professional ${professional.name} Added`);
                })
        } else {
            res.send("Erro na criação do profissional. Verifique se todos os campos foram preenchidos");
        }
    } else {
        res.sendStatus(403);
    }



}

const professionalsList = (req: Request, res: Response) => {


    let professionalsList: Professional[] = [];

    let sql = `SELECT * FROM professionals`;

    db.all(sql, [], (error: Error, rows: Professional[]) => {
        if (error) {
            logger.error(error.message);
            res.send(error.message);
        }
        rows.forEach((row: Professional) => { professionalsList.push(row) });
        logger.info(req);
        res.send(professionalsList);
    }
    );
}

const updateProfessional = (req: Request, res: Response) => {
    logger.info(req);
    let professional: Professional = req.body;
    let sql = `UPDATE professionals SET name="${professional.name}",  
                                   birthday="${professional.birthday}",
                                   address="${professional.address}"
                                   role="${professional.role}"
                                   shift="${professional.shift}"
                                   sector="${professional.sector}",
                                   WHERE id="${professional.id}"
                                   `;


    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Professional Updated");
    });
}

const deleteProfessionalByQuery = (req: Request, res: Response) => {
    logger.info(req);
    let id = req.query.id;
    let sql = `DELETE from professionals WHERE id="${id}"`;

    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Professional Deleted");
    })
}





export {
    professionalsRoot,
    addProfessional,
    professionalsList,
    updateProfessional,
    deleteProfessionalByQuery
};