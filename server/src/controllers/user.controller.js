import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import crypto from "crypto";

// [POST] api/v1/user/signup
const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const checkEmail = await userModel.findOne({
      where: {
        email,
      },
    });

    if (checkEmail)
      return responseHandler.badrequest(res, "Email already in use");

    if (password !== confirmPassword)
      return responseHandler.badrequest(res, "Password must match");

    const username = email.split("@")[0];

    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");

    await userModel.create({
      email,
      username,
      password: hashedPassword,
      salt,
    });

    responseHandler.createdMessage(res, "Sign up success");
  } catch (err) {
    console.error("Error in signup:", err.message || err);
    responseHandler.error(res);
  }
};

// [POST] /api/v1/user/signin
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({
      where: { email },
    });

    if (!user) return responseHandler.badrequest(res, "Email does not exist");

    const hashedPassword = crypto
      .pbkdf2Sync(password, user.salt, 1000, 64, "sha512")
      .toString("hex");

    if (hashedPassword !== user.password)
      return responseHandler.badrequest(res, "Wrong password");

    const token = jsonwebtoken.sign(
      { data: user.userId },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    responseHandler.created(res, {
      token,
      userId: user.userId,
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    console.error("Error in signin:", err.message || err);
    responseHandler.error(res);
  }
};

// [PUT] /api/v1/user/update-password
const updatePassword = async (req, res) => {
  try {
    const { password, newPassword, confirmNewPassword } = req.body;
    const { userId } = req.user;

    if (newPassword !== confirmNewPassword)
      return responseHandler.badrequest(res, "ConfirmNewPassword not match");

    const user = await userModel.findByPk(userId);

    if (!user) return responseHandler.unauthorize(res);

    const hashedPassword = crypto
      .pbkdf2Sync(password, user.salt, 1000, 64, "sha512")
      .toString("hex");

    if (hashedPassword !== user.password)
      return responseHandler.badrequest(res, "Wrong password");

    const hashedNewPassword = crypto
      .pbkdf2Sync(newPassword, user.salt, 1000, 64, "sha512")
      .toString("hex");

    await user.update({ password: hashedNewPassword });

    responseHandler.ok(res);
  } catch (err) {
    console.error("Error in update password: ", err.message || err);
    responseHandler.error(res);
  }
};

// [GET] /api/v1/user/info
const getInfo = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await userModel.findByPk(userId, {
      attributes: ["userId", "username", "email", "createdAt", "updatedAt"],
    });

    if (!user) return responseHandler.notfound(res);

    responseHandler.ok(res, user);
  } catch (err) {
    console.error("Error fetching user info:", err.message || err);
    responseHandler.error(res);
  }
};

// [DELETE] /api/v1/user/:userId

export default { signin, signup, updatePassword, getInfo };
