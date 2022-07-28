const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        title: "ConnecTour",
        version: "1.0.0",
        message: "ConnecTour: API onde você vai cadastrar e encontrar informações dos atrativos turísticos do Estado."
    })
})

module.exports = router