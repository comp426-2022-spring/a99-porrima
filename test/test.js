const request = require('supertest')('http://localhost:3000/app')
const expect = require('chai').expect
const app = require('../server')

// TESTING NEEDS WORK
// CURRENTLY ADDED NULL VALUES TO THE DB; THE REQUESTS NEED TO CHANGE

describe('POST /new/user/', function() {
    it('Adds new user to user database',  async function() {
        const response = await request.post('/new/user/?username=person&email=user@email.com&password=abc123')

        expect(response.status).to.eql(200)
    })
})

describe('GET /user/exists', function() {
    it('Displays all user info',  async function() {
        const response = await request.get('/user/exists')

        expect(response.status).to.eql(200)
    })
})

describe('GET /user/signin/:username/:password', function() {
    it('Checks to see if user is signed in',  async function() {
        const response = await request.get('/user/signin/matthew/abc123') // I added this via curl

        expect(response.status).to.eql(200)
    })
})

describe('PATCH /update/user/:username', function() {
    it('Updates user info',  async function() {
        const response = await request.patch('/update/user/person')

        expect(response.status).to.eql(200)
    })
})

after(async () => {
    require('../server').stop();
});