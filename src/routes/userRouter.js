const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const authController = require('../controllers/login');
const { grantAccess } = require('../middleware/auth');
const { allowIfLoggedin } = require('../middleware/auth')

router.post("/signup", controller.signUp);
router.post("/login", authController.login);
router.get("/all", allowIfLoggedin, grantAccess('readAny', 'profile') ,controller.getAllUsers);
router.get("/regnumber", allowIfLoggedin, grantAccess('readOwn', 'profile'), controller.getByRegister);
router.put("/update/:id", allowIfLoggedin, grantAccess('updateAny', 'profile'), controller.updateUser);
router.put("/updatePassword/:id", allowIfLoggedin, grantAccess('updateOwn', 'profile'), controller.updatePassword);
router.delete("/delete/:id", allowIfLoggedin, grantAccess('deleteAny', 'profile'), controller.deleteUser);

module.exports = router