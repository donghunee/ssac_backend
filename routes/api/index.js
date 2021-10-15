var express = require("express");
var router = express.Router();
const authRouter = require("./auth/index");
const postsRouter = require("./posts/index");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/auth", authRouter);
router.use("/posts", postsRouter);

module.exports = router;
