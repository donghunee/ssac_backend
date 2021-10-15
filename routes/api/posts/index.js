var express = require("express");
const postsController = require("../../../controllers/posts/postsController");
const authModule = require("../../../modules/authModule");
var router = express.Router();

router.post("/", authModule.loggedIn, postsController.createPost);
router.get("/", postsController.getAllData);
router.get("/:postId", authModule.loggedIn, postsController.detailPost);
router.put("/:postId", authModule.loggedIn, postsController.createPost);
router.delete("/:postId", authModule.loggedIn, postsController.createPost);

router.post(
  "/:postId/comments",
  authModule.loggedIn,
  postsController.createComment
);

module.exports = router;
