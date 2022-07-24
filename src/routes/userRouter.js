const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController')
const authController = require('../controllers/login')
const { checkAuth } = require('../middleware/auth')

router.post("/create", controller.createUser)
router.post("/login", authController.login)
router.get("/all", controller.getAllUsers)
router.get("/regnumber", controller.getByRegister)
router.put("/update/:id", checkAuth, controller.updateUser)
router.put("/updatePassword/:id", controller.updatePassword)
router.delete("/delete/:id", checkAuth, controller.deleteUser)

module.exports = router