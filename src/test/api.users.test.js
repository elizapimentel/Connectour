const request = require('supertest');
const app = require('../app');

let token;
let elementId;

describe("API Connectour test user - admin", () => {
    it("POST /user/signup", (done) => {
        request(app)
            .post("/user/signup")
            .expect("Content-Type", /json/)
            .send({
                name: "Maria",
                surname: "Silva",
                userName: "maria", 
                county: "Recife", 
                role: "admin", 
                registrationNumber: 55663, 
                password: "2222"
            })
            .expect(201)
            .end((err, res) => {
                if(err) return done(err)
                elementId = res.body._id
                token = res.body.token
                return done()
            })
    })
    it("Login /user/login", (done) => {
        request(app)
            .post("/user/login")
            .expect("Content-type", /json/)
            .send({
                userName: "maria",
                password: "2222"
            })
            .expect(200)
            .end((err, res) => {
                if(err) return done(err)
                token = res.body.token
                return done()
            })
    })
    it("GET /user/all", (done) => {
        request(app)
            .get("/user/all")
            .set("x-access-token", `${token}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.length).not.toBe(0)
            })
            .end((err, res) => {
                if(err) return done(err)
                return done()
            })
    })
    it("GET /user/regnumber", (done) => {
        request(app)
            .get("/user/regnumber")
            .set("x-access-token", `${token}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.length).not.toBe(0)
            })
            .end((err, res) => {
                if(err) return done(err)
                return done()
            })
    })
})