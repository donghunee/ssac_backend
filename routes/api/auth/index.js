var express = require("express");
const authController = require("../../../controllers/auth/authController");
const authModule = require("../../../modules/authModule");
const upload = require("../../../modules/awsUpload");
var router = express.Router();

router.post("/signin", authController.signIn);
router.post("/signup", authController.signUp);
router.get("/profile", authModule.loggedIn, authController.getProfile);
router.post("/profile", authModule.loggedIn, authController.addProfile);
router.post(
  "/profile/image",
  authModule.loggedIn,
  upload.single("img"),
  authController.uploadProfileImage
);

module.exports = router;
