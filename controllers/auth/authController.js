const user = require("../../models/user");
const jwtModule = require("../../modules/jwtModule");
const statusCode = require("../../modules/statusCode");

const authController = {
  signIn: async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await user.findOne({ email, password });
      if (result) {
        // 있을 때
        const payload = {
          email: email,
          verified: result.verified,
        };

        const token = jwtModule.create(payload);

        res.status(statusCode.OK).json({
          message: "로그인 성공",
          accessToken: token,
        });
      } else {
        res.status(statusCode.BAD_REQUEST).json({
          message: "로그인 실패",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(statusCode.DB_ERROR).json({
        message: "DB 서버 에러",
      });
    }
  },
  signUp: async (req, res) => {
    const { nickName, email, password } = req.body;

    try {
      const result = await user.findOne({ $or: [{ nickName }, { email }] }); // 아이디 체크

      if (!result) {
        // 중복된 아이디가 없을 경우
        const userModel = new user({ nickName, email, password });
        await userModel.save();
        res.status(statusCode.OK).json({
          message: "회원가입 성공",
        });
      } else {
        // 있을 경우
        res.status(statusCode.BAD_REQUEST).json({
          message: "중복된 아이디가 존재합니다.",
        });
      }
    } catch (error) {
      res.status(statusCode.DB_ERROR).json({
        message: "DB 서버 에러",
        error: error,
      });
    }
  },
  getProfile: async (req, res) => {
    const userInfo = req.userInfo;
    userInfo.password = null;
    res.status(statusCode.OK).json({
      message: "유저 정보 조회 성공",
      data: userInfo,
    });
  },
  addProfile: async (req, res) => {
    const { type, age, gender, degree, inoDate, profileImage } = req.body;
    const userInfo = req.userInfo;
    console.log(profileImage);
    userInfo.type = type;
    userInfo.age = age;
    userInfo.gender = gender;
    userInfo.degree = degree;
    userInfo.inoDate = new Date(inoDate);
    userInfo.profileImage = profileImage;
    userInfo.verified = true;

    try {
      const result = await userInfo.save();
      const payload = {
        email: result.email,
        verified: result.verified,
      };

      const token = jwtModule.create(payload);

      res.status(statusCode.OK).json({
        message: "정보 추가 완료",
        accessToken: token,
      });
    } catch (error) {
      console.log(error);
      res.status(statusCode.DB_ERROR).json({
        message: "정보 추가 실패",
      });
    }
  },
  uploadProfileImage: async (req, res) => {
    const img = req.file;
    console.log(img);
    if (img) {
      res.status(statusCode.OK).json({
        message: "이미지 업로드 완료",
        imgUrl: img.location,
      });
    } else {
      res.status(statusCode.BAD_REQUEST).json({
        message: "이미지 업로드 실패",
      });
    }
  },
};

module.exports = authController;
