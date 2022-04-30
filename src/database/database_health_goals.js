"use strict";

const db = require("./database_user");
//db.prepare()
//db.exec('DROP TABLE user_health_goals')
const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='user_health_goals';`)
let row = stmt.get();
if(row === undefined) {
    console.log('Health goals database appears to be empty. Creating database...')

    // Other tables will be defined with id as primary key to make joins easier
    // Both password and salt will be hashed values
    // More documentation is available at the API endpoint for this
    const sqlInit = `
        PRAGMA foreign_keys = ON;
    
        CREATE TABLE user_health_goals ( 
            username TEXT PRIMARY KEY,
            monday TEXT,
            tuesday TEXT,
            wednesday TEXT,
            thursday TEXT,
            friday TEXT,
            saturday TEXT,
            sunday TEXT,
            FOREIGN KEY (username)
                REFERENCES user (username)
                ON UPDATE CASCADE
            );
        `;
    db.exec(sqlInit)
} else {
    console.log('Health goals database exists.')
}

module.exports = db