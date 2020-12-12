const { Router } = require("express");

const controller = require("./controller");

const router = Router();

router.post("/login", controller.postLogin);

router.post("/register", controller.postRegister);

module.exports = router;
