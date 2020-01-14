
const request = require('supertest');
var assert = require('assert');

const { app, server } = require("../src/index");

after(() => server.close(() => console.log("server closed")));


describe('GET /user', function () {
    it('Get since zero', function () {
        request(app)
            .get('/api/users?since=0')
            .expect(200)
            .then(response => {
                assert.equal(response.body.next_url.split("?")[1], "since=13");
                assert.equal(response.body.users.length, 9);
            });
    });

    it('Get since 5', function () {
        request(app)
            .get('/api/users?since=5')
            .expect(200)
            .then(response => {
                assert.equal(response.body.next_url.split("?")[1], "since=13");
                assert.equal(response.body.users.length, 5);
            });
    })

    it('Get since 5000', function () {
        request(app)
            .get('/api/users?since=5000')
            .expect(200)
            .then(response => {
                assert.equal(response.body.next_url.split("?")[1], "since=0");
                assert.equal(response.body.users.length, 0);
            });
    })

    it('Get since -1', function (done) {
        request(app)
            .get('/api/users?since=-1')
            .expect(400)
            .end(done);
    })
});

describe("GET user details", function () {
    it('Requests an existing user', function () {
        request(app)
            .get('/api/users/renamed/details')
            .expect(200)
            .then(response => {
                assert.equal(response.body.login, "renamed");
            })
    });

    it('Requests an non-existing user', function (done) {
        request(app)
            .get('/api/users/wer/details')
            .expect(200)
            .end(done);
    });
});

describe("GET repos", function () {
    it('Get all repos', function () {
        request(app)
            .get('/api/users/renamed/repos')
            .expect(200)
            .then(response => {
                assert.equal(response.body.length, 2);
            })
    });
});
