# Database Documentation

Using better-sqlite3
Two datases
1. Access Logs
    * Standard logging information is held here. API endpoints defined for debugging. Middleware in place to log to database.
2. User Info
    * Table One: user
        * Four pieces of information: Username, Email, Password, Salt
        * Username is primary key. Need to add implementaiton to ensure only one username exists. (Need to be distinct)
    * Table Two: journal
        * id, username, date, journal entry
        * Only one journal entry per day per user with the ability to edit any day's journal entry
        * This check is performed in the API which creates a journal entry
    * Table Three: user_health_goals
        *  username, monday, tuesday, wednesday, thursday, friday, saturday, sunday
        *  Username is foreign key, which references username from user table
        *  User is able to edit any day through api
    
