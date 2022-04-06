# Documentation for APIs

## Access Log APIs
* Middleware to log any usage on the app
* GET all access logs at '/app/log/access'

## User APIs
* '/app/new/user' (POST)
    * Used to create a new user
    * User inputs: email, username, password
    * A salt is generated and hased with the password, using md5, and then stored in the db
    * All arguments, except for the salt which is generated on the fly, are body parameters

* '/app/user/exists' (GET)
    * Used for debugging
    * Returns all values in the user db

* '/app/user/signin/' (GET)
    * Used for debugging
    * Checks to make sure a user would be able to sign in with correct username and password

* '/app/update/user/:username' (PATCH)
    * Used to update a user's information
    * All arguments are based through body paramters
    * If the password it updated a new salt is generated

* 'app/delete/user/:username' (DELETE)
    * Used to delete a user
    * Only item needed is the username which is passed through a paramter; all usernames must be unique
    * Deletes the user from the datase

## Journal APIs
* '/app/add/entry/:username' (POST)
    * A date (generated in the API), username, entry (body params) are stored in the journal table
    * A check is performed to ensure that a journal entry doesn't exist for this date; if there is, a new journal entry is not created

* '/app/get/entries/:username' (GET)
    * Used to get all journal entries for a user
    * Only argument needed is username which is passed through a parameter

* '/app/get/all/entries' (GET)
    * Used for debugging
    * Returns entire journal db

* '/app/update/entry/:username/:date/' (PATCH)
    * Used to update a journal entry for a specific date
    * The updated entry is passed through body parameters

* '/app/delete/entry/:username/:date' (DELETE)
    * Used for deleting a journal entry
    * Username and date are required to be passed through params
