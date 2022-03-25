# Database Documentation

Using better-sqlite3
Two datases
1. Access Logs
Standard logging information is held here. API endpoitns defined for debugging. Middleware in place to log to database.
2. User Info
Four pieces of information: Username, Email, Password, Salt
Username is primary key. Need to add implementaiton to ensure only one username exists. (Need to be distinct)