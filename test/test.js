const request = require("supertest");
const expect = require("chai").expect;
const app = require("../server");

// TESTING NEEDS WORK
// CURRENTLY ADDED NULL VALUES TO THE DB; THE REQUESTS NEED TO CHANGE

describe("POST /new/user/", () => {
  const user = { username: "user1", password: "abc", email: "email@email.com" };
  it("Adds new user to user database", (done) => {
    request(app)
      .post("/app/new/user/")
      .send(user)
      .expect(200)
      .end((err, res) => {
        done();
      });
  });
});

describe("GET /user/exists", () => {
  it("Displays all user info", (done) => {
    request(app)
      .get("/app/user/exists/")
      .expect(200)
      .end((err, res) => {
        done();
      });
  });
});

describe("POST /user/signin/", () => {
  const user = { username: "user1", password: "abc" };
  it("Checks to see if user is signed in", (done) => {
    request(app)
      .post("/app/user/signin/")
      .send(user)
      .expect(200)
      .end((err, res) => {
        done();
      });
  });
});

describe("PATCH /update/user/", () => {
  const user = { username: "user1", password: "abc123" };
  it("Updates user info", (done) => {
    request(app)
      .patch("/app/update/user/")
      .send(user)
      .expect(200)
      .end((err, res) => {
        done();
      });
  });
});

describe("DELETE /delete/user/", () => {
  const user = { username: "user1" };
  it("Deletes user ", (done) => {
    request(app)
      .delete("/app/delete/user/")
      .send(user)
      .expect(200)
      .end((err, res) => {
        done();
      });
  });
});

describe("GET /log/access", () => {
  it("Gets logs", (done) => {
    request(app)
      .get("/app/log/access")
      .expect(200)
      .end((err, res) => {
        done();
      });
  });
});

describe("POST /new/entry/", () => {
  const user = { username: "test1", entry: "entry goes here" };
  it("Adds new entry for use", (done) => {
    request(app)
      .post("/app/new/entry/")
      .send(user)
      .expect(200)
      .end((err, res) => {
        done();
      });
  });
});

describe("POST /user/entries/", () => {
  const user = { username: "test1" };
  it("Gets all entries for a user", (done) => {
    request(app)
      .post("/app/user/entries/")
      .send(user)
      .expect(200)
      .end((err, res) => {
        done();
      });
  });
});

describe("GET /all/entries", () => {
  it("Gets all entries in database", (done) => {
    request(app)
      .get("/app/all/entries")
      .expect(200)
      .end((err, res) => {
        done();
      });
  });
});

let today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();

if (dd < 10) dd = "0" + dd;
if (mm < 10) mm = "0" + mm;

today = dd + "-" + mm + "-" + yyyy;

describe("PATCH /update/entry/", () => {
  const data = { username: "test1", date: today, entry: "updated entry" };
  it("Updates entry for user and date", (done) => {
    request(app)
      .patch("/app/update/entry/")
      .send(data)
      .expect(200)
      .end((err, res) => {
        done();
      });
  });
});

describe("DELETE /update/entry/", () => {
  const data = { username: "test1", date: today };
  it("Delete entry for user and date", (done) => {
    request(app)
      .delete("/app/delete/entry/")
      .send(data)
      .expect(200)
      .end((err, res) => {
        done();
      });
  });
});

after(async () => {
  require("../server").stop();
});
