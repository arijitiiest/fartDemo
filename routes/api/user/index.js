const { Router } = require("express");

const controller = require("./controller");
const isAuth = require("../../../middleware/isAuth");

const router = Router();

router.get("/", isAuth, controller.getUsers);

router.post("/", isAuth, controller.postUser);

router.delete("/", isAuth, controller.deleteUser);

router.patch("/", isAuth, controller.editUser);

module.exports = router;
