"use strict";

const Database = require('better-sqlite3')

const db = new Database('user.db')

const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='user';`)
let row = stmt.get();
if(row === undefined) {
    console.log('User database appears to be empty. Creating user database...')

    // Other tables will be defined with id as primary key to make joins easier
    // Both password and salt will be hashed values
    // More documentation is available at the API endpoint for this
    const sqlInit = `
        CREATE TABLE user ( 
            username TEXT PRIMARY KEY,
            email TEXT,
            password TEXT,
            salt TEXT);
        `;
    db.exec(sqlInit)
} else {
    console.log('User database exists.')
}

module.exports = db