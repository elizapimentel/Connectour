const express = require('express');
const router = express.Router();
const controller = require('../controllers/postController')
const { grantAccess } = require('../middleware/auth');
const { allowIfLoggedin } = require('../middleware/auth')

router.post("/create", allowIfLoggedin, grantAccess('createOwn', 'post'),controller.creatPost)   
router.get("/all", allowIfLoggedin, grantAccess('readAny', 'post'), controller.getAll)
router.get("/name", allowIfLoggedin, grantAccess('readAny', 'post'), controller.getByName)
router.put("/update/:id", allowIfLoggedin, grantAccess('updateOwn', 'post'), controller.updatePost)
router.delete("/delete/:id", allowIfLoggedin, grantAccess('deleteAny', 'post'), controller.deletePost) 

module.exports = router
