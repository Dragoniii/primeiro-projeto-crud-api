import { Response, Request, NextFunction } from "express";
import SupportIT from "../models/SupportIT";
import { createDbConnection } from "../db/dbConfig";
import { Database } from "sqlite3";
import logger from "../services/logger";


let db: Database = createDbConnection();

const supportsITRoot = (req: Request, res: Response) => {
    res.send("Página Inicial SupportsIT");
}

const addSupportIT = (req: Request, res: Response) => {
    logger.info(req);

    let token = req.headers.authorization;

    if (token == "Bearer 12345") {
        let supportIT: SupportIT = req.body;

        let sql = `INSERT INTO supportsIT(name, birthday, address, type, company, settle) VALUES ("${supportIT.name}", "${supportIT.birthday}", "${supportIT.address}", "${supportIT.type}", "${supportIT.company}", "${supportIT.settle}")`;

        if (supportIT.name && supportIT.birthday && supportIT.address && supportIT.type && supportIT.company && supportIT.settle) {
            db.run(sql,
                (error: Error) => {
                    if (error) {
                        res.end(error.message);
                    }
                    res.send(`SupportIT ${supportIT.name} Added`);
                })
        } else {
            res.send("Erro na criação do estudante. Verifique se todos os campos foram preenchidos");
        }
    } else {
        res.sendStatus(403);
    }



}

const supportsITList = (req: Request, res: Response) => {


    let supportsITList: SupportIT[] = [];

    let sql = `SELECT * FROM supportsIT`;

    db.all(sql, [], (error: Error, rows: SupportIT[]) => {
        if (error) {
            logger.error(error.message);
            res.send(error.message);
        }
        rows.forEach((row: SupportIT) => { supportsITList.push(row) });
        logger.info(req);
        res.send(supportsITList);
    }
    );
}

const updateSupportIT = (req: Request, res: Response) => {
    logger.info(req);
    let supportIT: SupportIT = req.body;
    let sql = `UPDATE supportsIT SET name="${supportIT.name}", 
                                   birthday="${supportIT.birthday}", 
                                   address="${supportIT.address}",
                                   type="${supportIT.type}", 
                                   company="${supportIT.company}",
                                   settle="${supportIT.settle}"
                                   WHERE id="${supportIT.id}"
                                   `;


    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("SupportIT Updated");
    });
}

const deleteSupportITByQuery = (req: Request, res: Response) => {
    logger.info(req);
    let id = req.query.id;
    let sql = `DELETE from supportsIT WHERE id="${id}"`;

    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("SupportIT Deleted");
    })
}





export {
    supportsITRoot,
    addSupportIT,
    supportsITList,
    updateSupportIT,
    deleteSupportITByQuery
};