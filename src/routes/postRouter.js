const express = require('express');
const router = express.Router();

const controller = require('../controllers/postController')
// const authController = require('../controllers/login')
// const { checkAuth } = require('../middleware/auth')

router.post("/create", controller.creatPost)   
router.get("/all", controller.getAll)
router.get("/name", controller.getByName)
router.put("/update/:id", controller.updatePost)
router.delete("/delete/:id", controller.deletePost) //gonna need authorization

module.exports = router
