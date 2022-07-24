const UserSchema = require('../models/usersSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET

const login = (req, res) => {
    try {
        UserSchema.findOne({ userName: req.body.userName }, (error, user) => {
            if(!user) {
                return res.status(401).send({
                    message: "User not found",
                    userName: `${req.body.userName}`
                })
            }
            const validPassword = bcrypt.compareSync(req.body.password, user.password)
            if(!validPassword) {
                return res.status(401).send({
                    message: "Login unauthorized!",
                    userName: `${req.body.userName}`
                })
            }
            if(user.role === 'admin') {
                const token = jwt.sign({ userName: user.userName }, SECRET)
                res.status(200).send({
                    "message": "Login successfully completed",
                    token
                })
            }
            res.status(200).send({
                "message": "Login successfully completed"
        })
    })
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    login
}