const UserSchema = require('../models/usersSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const signUp = async (req, res) => {
    let { name, surname, userName, county, role, registrationNumber, password } = req.body    
    try {       
        const userExists = await UserSchema.exists({ userName: userName.userName })
        if(userExists) {
            return res.status(400).send({
                "message": "User already registered"
            })}
            if(name.name === "" || password.password === "" || registrationNumber.registrationNumber === "") {
                return res.status(400).send({ "message": "Fill in all items" })
            }
        const hashedPassword = bcrypt.hashSync(password, 10);
        password = hashedPassword      
        const newUser = new UserSchema ({ name, surname, userName, county, role: role || 'user', registrationNumber, password});
        const token = jwt.sign({ userId: newUser._id }, SECRET, {
            expiresIn: "1d"});
        newUser.token = token
        await newUser.save()
        res.status(201).json({
            newUser,
            token
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getAllUsers = async (req, res) => {
    const user = await UserSchema.find().select('-password')
    res.status(200).send(user);    
}

const getByRegister = async (req, res) => {
    try {
        const regNumber = await UserSchema.findOne({ registrationNumber: req.query.regNumber }).select(['-password', '-userName'])
        res.status(200).send(regNumber)
    } catch (error) {
        res.status(404).send(error)
    }
}

const updateUser = async (req, res) => {
    const { name, surname, userName, role, county } = req.body
    try {
        const user = await UserSchema.findById(req.params.id)
        if(!user) {
            return res.status(404).json({ message: "User not found!" })
        }
        user.name = name || user.name
        user.surname = surname || user.surname
        user.userName = userName || user.userName
        user.role = role || user.role
        user.county = county || user.county

        const userExists = await UserSchema.exists({ userName: req.body.userName })
        if(userExists) {
            res.status(405).json({
                message: "User name already exists",
            })
        }        
        const savedUser = await user.save()
        res.status(200).json({
            message: "User profile updated",
            savedUser
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updatePassword = async (req, res) => {
    try {
        const user = await UserSchema.findById(req.params.id)
        if(!user) {
            return res.status(404).send({ message: "User not found" })
        }
        const newHashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = newHashedPassword      
        user.password = req.body.password    
        const newPwd = await user.save()
        res.status(200).send({
            message: "Password updated",
            newPwd
        })        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await UserSchema.findByIdAndDelete(req.params.id)
        if(!user) {
            return res.status(404).send({ message: "User not found" })
        }
        const userDeleted = await user.remove()
        res.status(200).json({
            message: "User deleted",
            userDeleted
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    signUp,
    getAllUsers,
    getByRegister,
    updateUser,
    updatePassword,
    deleteUser
}