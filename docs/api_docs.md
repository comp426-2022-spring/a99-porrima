# Documentation for APIs

## Access Log APIs
* Middleware to log any usage on the app
* GET all access logs at '/app/log/access'

## User APIs
## /app/new/user/ (POST)
* Used to create a new user
* User inputs: email, username, password
* A salt is generated and hased with the password, using md5, and then stored in the db
* All arguments, except for the salt which is generated on the fly, are body parameters
### cURL
```
curl --data "username=user&password=password&email=email@email.com" http://localhost:3000/app/new/user/
```
### Response
```
{"changes":1,"lastInsertRowid":34}
```
### Headers
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 4134
ETag: W/"1026-XmWrpcFLyyApjUWWCEoNuOLgKxA"
Date: Thu, 21 Apr 2022 18:40:17 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```


## /app/user/exists (GET)
* _Not implemented in the app_
* Used for debugging
* Returns all values in the user db
### cURL
```
curl http://localhost:3000/app/user/exists
```
### Response
```
{"username":"test1","email":"123@gmail.com","password":"5e676f813fd445b0b51a3b6d9f4a7d4f","salt":"52d52dee607713c4be65d45c525f9570"}
```
### Headers
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 4134
ETag: W/"1026-XmWrpcFLyyApjUWWCEoNuOLgKxA"
Date: Thu, 21 Apr 2022 18:40:17 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

## /app/user/signin/ (POST)
* Used for generating a token
* Checks to make sure a user would be able to sign in with correct username and password
### cURL
```
curl --data "username=username&password=password" http://localhost:3000/app/user/signin/
```
### Response
```
{ token: true, user: username, email: email@email.com }
```
### Headers
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 4134
ETag: W/"1026-XmWrpcFLyyApjUWWCEoNuOLgKxA"
Date: Thu, 21 Apr 2022 18:40:17 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

## /app/update/user/ (PATCH)
* Used to update a user's information
* All arguments are based through body paramters
* If the password it updated a new salt is generated
### cURL
```
curl -X PATCH http://localhost:3000/app/update/user/?username=test3&newusername=test4 -H "Accept: application/json"
```
### Response
```
{"changes":0,"lastInsertRowid":34}
```
### Headers
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 4134
ETag: W/"1026-XmWrpcFLyyApjUWWCEoNuOLgKxA"
Date: Thu, 21 Apr 2022 18:40:17 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

## app/delete/user/ (DELETE)
* Used to delete a user
* Only item needed is the username which is passed through a body paramter; all usernames must be unique
* Deletes the user from the datase
### cURL
```
curl -X DELETE http://localhost:3000/app/delete/user/?username=user -H "Accept: application/json"
```
### Response
```
{"changes":0,"lastInsertRowid":34}
```
### Headers
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 4134
ETag: W/"1026-XmWrpcFLyyApjUWWCEoNuOLgKxA"
Date: Thu, 21 Apr 2022 18:40:17 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

## Journal APIs
## /app/new/entry/ (POST)
* A date (generated in the API), username, entry (body params) are stored in the journal table
* A check is performed to ensure that a journal entry doesn't exist for this date; if there is, a new journal entry is not created
### cURL
```
curl --data "username=user&entry=words" http://localhost:3000/app/new/entry/
```
### Response
```
{"changes":1,"lastInsertRowid":11}
```
### Headers
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 4134
ETag: W/"1026-XmWrpcFLyyApjUWWCEoNuOLgKxA"
Date: Thu, 21 Apr 2022 18:40:17 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

## /app/user/entries/ (POST)
* Used to get all journal entries for a user
* Only argument needed is username which is passed through a body parameter
### cURL
```
curl --data "username=user" http://localhost:3000/app/user/entries/
```
### Response
```
{"date":"21-04-2022","entry":"words"}
```
### Headers
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 4134
ETag: W/"1026-XmWrpcFLyyApjUWWCEoNuOLgKxA"
Date: Thu, 21 Apr 2022 18:40:17 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

## /app/all/entries (GET)
* _Not implemented in the app_
* Used for debugging
* Returns entire journal db
### cURL
```
curl http://localhost:3000/app/all/entries
```
### Response
```
{"id":4,"date":"19-04-2022","username":"mattsg","entry":"according to greek philsopher socrates, the world is a dangerous and dark place. no one has purpose and we are just floating around the universe like a bunch of idiots. i happen to agree with des cartes when he says he agrees with socrates"},{"id":5,"date":"19-04-2022","username":"user","entry":"it could've been better"}
```
### Headers
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 4134
ETag: W/"1026-XmWrpcFLyyApjUWWCEoNuOLgKxA"
Date: Thu, 21 Apr 2022 18:40:17 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

## /app/update/entry/ (PATCH)
* _Not implemented in the app_
* Used to update a journal entry for a specific date
* The updated entry is passed through body parameters
### cURL
```
curl -X PATCH "http://localhost:3000/app/update/entry/?username=user&date=21-04-2022&entry=new" -H "Accept: application/json"
```
### Response
```
{"changes":0,"lastInsertRowid":11}
```
### Headers
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 4134
ETag: W/"1026-XmWrpcFLyyApjUWWCEoNuOLgKxA"
Date: Thu, 21 Apr 2022 18:40:17 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

## /app/healthgoals/ (GET)
* Returns all the daily goals for user
* Username is required and is passed through query parameter
### cURL
```
curl http://localhost:3000/app/healthgoals/?username=user
```
### Response
```
{"monday":"100 push ups","tuesday":"1000 jumping jacks in 5 minute intervals","wednesday":null,"thursday":null,"friday":"75 burpees","saturday":"Rest","sunday":"100 jumping jacks"}
```
### Headers
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 180
ETag: W/"b4-BfT5obmfNEpH8ut99j9Tuzr7OSE"
Date: Tue, 26 Apr 2022 16:27:39 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

## /app/healthgoals/addgoal (POST)
* Used for adding goal at a given day
* Arguments needed are username, day, & goal which is passed through body parameters
### cURL
```
curl -X POST -H "Content-Type: application/json" -d '{"username": "mattsg", "day": "thursday", "goal": "5 sit ups"}' http://localhost:3000/app/healthgoals/addgoal
```
### Response
```
{"changes":1,"lastInsertRowid":9}
```
### Headers
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 33
ETag: W/"21-JZoqwLT3XlZB1H9LlgjNs++ce3o"
Date: Tue, 26 Apr 2022 16:45:44 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

## /app/healthgoals/updategoal (PATCH)
* Used for updating a goal at given day
* Username, day, and goal are required to be passed through body params
### cURL
```
curl -X PATCH -H "Content-Type: application/json" -d '{"username": "mattsg", "day": "thursday", "goal": "100 sit ups"}' http://localhost:3000/app/healthgoals/updategoal
```
### Response
```
{"changes":1,"lastInsertRowid":9}
```
### Headers
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *        
Content-Type: application/json; charset=utf-8
Content-Length: 33
ETag: W/"21-JZoqwLT3XlZB1H9LlgjNs++ce3o"
Date: Tue, 26 Apr 2022 16:46:54 GMT   
Connection: keep-alive
Keep-Alive: timeout=5
```

## /app/healthgoals/deletegoal (DELETE)
* Used for deleting a goal at given day
* Arguments needed are username & day which is passed through body parameters
### cURL
```
curl -X DELETE -H "Content-Type: application/json" -d '{"username": "mattsg", "day": "thursday"}' http://localhost:3000/app/healthgoals/deletegoal
```
### Response
```
{"changes":1,"lastInsertRowid":9}
```
### Headers
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *        
Content-Type: application/json; charset=utf-8
Content-Length: 33
ETag: W/"21-JZoqwLT3XlZB1H9LlgjNs++ce3o"
Date: Tue, 26 Apr 2022 16:48:53 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```
