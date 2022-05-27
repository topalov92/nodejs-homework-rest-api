const express = require("express");
const { ctrlWrapper, validation, auth,  upload } = require("../../middlewares");
const { joiSchema, subscriptionJoiSchema } = require("../../models/user");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.current));
router.patch( "/", auth, validation(subscriptionJoiSchema), ctrlWrapper(ctrl.subscription));
router.patch( "/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.avatar));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post("/verify", ctrlWrapper(ctrl.secondVerifyEmail));

module.exports = router;