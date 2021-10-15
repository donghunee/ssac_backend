const { Mongoose } = require("mongoose");
const post = require("../../models/post");
const statusCode = require("../../modules/statusCode");
const dayjs = require("dayjs");

const postsController = {
  createPost: async (req, res) => {
    const userInfo = req.userInfo;
    const { title, content, category, tags } = req.body;
    const postModel = new post({
      title,
      content,
      category,
      tags,
      writer: userInfo._id,
      publishedDate: dayjs(),
    });
    try {
      const result = await postModel.save();
      res.status(statusCode.OK).json({
        message: "게시물 생성 완료",
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(statusCode.DB_ERROR).json({
        message: "게시물 생성 실패",
      });
    }
  },
  detailPost: async (req, res) => {
    const { postId } = req.params;
    console.log(postId);
    const data = await post
      .findById(postId)
      .populate("writer comments.commentWriter");

    res.status(200).json({
      message: "조회성공",
      data: data,
    });
  },
  getAllData: async (req, res) => {
    const data = await post.find({}).populate("writer");
    res.status(200).json({
      message: "조회성공",
      data: data,
    });
  },
  createComment: async (req, res) => {
    const userInfo = req.userInfo;
    const { comment } = req.body;
    const { postId } = req.params;
    try {
      const result = await post.findById(postId);
      const newComment = {
        commentWriter: userInfo._id,
        commentContent: comment,
        commentDate: dayjs(),
      };
      result.comments.push(newComment);

      await result.save();
      const popResult = await post
        .findById(postId)
        .populate("comments.commentWriter");

      res.status(statusCode.OK).json({
        message: "댓글 생성 완료",
        data: popResult,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = postsController;
