# porrima

An open source healthcare management app, aimed to organize and assist in the process of interacting with the healthcare system.

## Developers 

The team for this project is comprised of students at UNC-CH.

## Documentation

Documentation for API endpoints, UI usage, and planning can be found in the [docs](https://github.com/comp426-2022-spring/a99-porrima/tree/main/docs) folder.

## Dependencies

* better-sqlite3
    * Databases are built using better-sqlite3
* react
    * Used for frontend
* react-icons
    * Used for frontend
* cors
    * Calling APIs
* express
    * Generating server
* md5
    * Hashing passwords
* chai
    * Dev - for testing
* fs
    * Dev - writing to access log
* minimist
    * Dev - selecting port to run on
* mocha
    * Dev - for testing
* morgan
    * Dev - for logging user actions
* nodemon
    * Dev - for runnin server
* request
    * Dev - for testing
* supertest
    * Dev - for testing

## Deliverables

A GitHub repository containing your code and documentation and a prototype release package. Your project should take the form of a Node package, with all of the attendant items associated with that. The following three script commands should work in your package:

### Install dependencies in package
`npm install` - Install [dependencies](https://github.com/comp426-2022-spring/a99-porrima#dependencies) for your package.<br />

### Run tests on server
`npm test` - Start app, check that everything can run, and then stop app.<br />

### Start app/system
`npm start` - In the a99-porrima directory. Run on port 3000. <br />
`cd porrima-app` - Move into the react app. <br />
`npm start` - Start the react app. Will be prompted to run on different port. Select 'y'. <br />
Your team is responsible for incorporating the following specifications and deliverables into your final project:

1. Back-end specifications
    * API built on whatever framework you choose. You can build an API that interacts with other APIs as well in order to integrate them.
    * API root endpoint at http://HOST/app/.
    * Should create (if nonexistent) and interact with a database of users and interactions (this can be logs, even). These can be separate databases for different microservices or separate tables in one database. It is up to your team’s decisions.
    * Database can be of any type you choose.
2. Front-end specifications
    * Give users the ability to register an account, update their information, see their information somewhere, and delete their account.
    * Interactions with the front end should be logged in a database.
3. Database specifications
    * User database - registration details (username, email address, etc.)
    * Interaction database - details of user interactions (login history, access logs, etc.)
4. Documentation
    * License documenation - Choose a license and include it in the repository just like we have been.
    * README.md file with basic descriptiong, installation requirements/instructions, dependency list, run instructions
/docs/ directory containing full documentation of every available API endpoint that you create for your app. This directory shoud also house an archive of your planning documentation.
    * Code comments (preferably referring to the documentation)
    * User instructions in the interface
5. Demo video to be presented in class on either 21 or 26 April
6. Self/group evaluation (Individual group members: this is part of the final exam for the course.)
