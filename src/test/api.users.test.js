const request = require('supertest');
const app = require('../app');

let elementId;
describe("API Connectour user test", () => {
    it("POST /user/signup", (done) => {
        request(app)
            .post("/user/signup")
            .expect("Content-Type", /json/)
            .send({
                name: "Leticia",
                surname: "Silva",
                userName: "leticia", 
                county: "Recife", 
                role: "user", 
                registrationNumber: 44555, 
                password: "2323"
            })
            .expect(201)
            .end((err, res) => {
                if(err) return done(err)
                elementId = res.body._id
                return done()
            })
    })
    
})