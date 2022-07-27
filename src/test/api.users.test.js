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
                name: "Marta",
                surname: "Assis",
                userName: "martaassis", 
                county: "Recife", 
                role: "admin", 
                registrationNumber: 55254, 
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
                userName: "martaassis",
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
    it("PUT /user/update/:id", (done) => {
        request(app)
            .put(`/user/update/${elementId}`)
            .set("x-access-token", `${token}`)
            .expect("Content-Type", /json/)
            .send({
                name: "Marta Maria",
            })
            .expect(200)    
            .expect((res) => {
                expect(res.body.savedUser._id).toBe(elementId)
                expect(res.body.savedUser.name).toBe("Marta Maria")
                
            })
            .end((err, res) => {
                if(err) return done(err)
                return done()
            })
    })
})