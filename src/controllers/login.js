const UserSchema = require('../models/usersSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const login = (req, res) => {
    try {
        const { userName, password } = req.body
        UserSchema.findOne({ userName }, (err, user) => {
            if(!user) {
                return res.status(401).send({
                    message: "User not found",
                    userName: `${ userName }`
                })
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword) {
                return res.status(401).send({
                    message: "Login unauthorized!",
                    userName: `${ userName }`
                })
            }
                const token = jwt.sign({ userId: user._id }, SECRET, {
                    expiresIn: '1d'
                })
                UserSchema.findByIdAndUpdate(user._id, { token })
                res.status(200).json({
                    "message": "Login successfully completed",
                    user,
                    token
                })
    })
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    login
}