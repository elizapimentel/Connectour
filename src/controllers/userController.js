const UserSchema = require('../models/usersSchema');
const bcrypt = require('bcrypt');

//creat permissions
const createUser = async (req, res) => {
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
        const newUser = new UserSchema ({ name, surname, userName, county, role, registrationNumber, password, createdAt: new Date() })    
        await newUser.save()  
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
//put try/catch
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
//add try/catch
const updateUser = async (req, res) => {
    const { name, surname, userName, county, registrationNumber } = req.body
    const user = await UserSchema.findByIdAndUpdate(req.params.id, { name, surname, userName, county, registrationNumber }, { new: true }).select('-password')
    res.status(200).send(user);
}
//add try/catch
const updatePassword = async (req, res) => {
    const user = await UserSchema.findById(req.params.id)
    if(!user) {
        return res.status(404).send({ message: "User not found" })
    }
    const newHashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = newHashedPassword      
    user.password = req.body.password

    await user.save()
    res.status(200).send({
        "message": "Password updated"
    })
}
//add try/catch
const deleteUser = async (req, res) => {
    const user = await UserSchema.findByIdAndDelete(req.params.id)
    if(!user) {
        return res.status(404).send({ message: "User not found" })
    }
    res.status(200).send({
        "message": "User deleted",
        "user": user
    })
}

module.exports = {
    createUser,
    getAllUsers,
    getByRegister,
    updateUser,
    updatePassword,
    deleteUser
}