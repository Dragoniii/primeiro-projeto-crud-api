
import { Database, sqlite3 } from "sqlite3";

const sqlite3 = require("sqlite3").verbose();
const filePath: string = "./db/school.db";

const createDbConnection = () => {
    let db: Database = new sqlite3.Database(filePath, (error: Error) => {
        if (error) {
            return console.error(error.message);
        }
    });
    
    db.exec(`CREATE TABLE IF NOT EXISTS professionals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50),
        birthday VARCHAR(50),
        address VARCHAR(50),
        role VARCHAR(50),
        shift VARCHAR(50),
        sector VARCHAR(50)
        );
        `);

    db.exec(`CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50),
        birthday VARCHAR(50),
        address VARCHAR(50),
        shift VARCHAR(50),
        year VARCHAR(50),
        room VARCHAR(50)
        );
        `);

    db.exec(`CREATE TABLE IF NOT EXISTS supportsIT (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50),
        birthday VARCHAR(50),
        address VARCHAR(50),
        type VARCHAR(50),
        company VARCHAR(50),
        settle VARCHAR(50)
        );
        `);
    return db;
}


export { createDbConnection }