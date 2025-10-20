import express from "express";
import { body } from "express-validator";
import favoriteController from "../controllers/favorite.controller.js";
import userController from "../controllers/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

// [POST] api/v1/user/signup
router.post(
  "/signup",
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password minium 8 characters"),
  body("confirmPassword").exists().withMessage("ConfirmPassword is required"),
  requestHandler.validate,
  userController.signup
);

// [POST] /api/v1/user/signin
router.post(
  "/signin",
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minimum 8 characters"),
  requestHandler.validate,
  userController.signin
);

// [PUT] /api/v1/user/update-password
router.put(
  "/update-password",
  tokenMiddleware.auth,
  body("password")
    .exists()
    .withMessage("password is requied")
    .isLength({ min: 0 })
    .withMessage("password minimum 8 characters"),
  body("newPassword")
    .exists()
    .withMessage("newPassword is requied")
    .isLength({ min: 0 })
    .withMessage("newPassword minimum 8 characters"),
  body("confirmNewPassword")
    .exists()
    .withMessage("confirmNewPassword is requied")
    .isLength({ min: 0 })
    .withMessage("confirmNewPassword minimum 8 characters"),
  requestHandler.validate,
  userController.updatePassword
);

// [DELETE] /api/user/:userId

// [GET] /api/v1/user/info
router.get("/info", tokenMiddleware.auth, userController.getInfo);

// [GET] /api/v1/user/favorites
router.get(
  "/favorites",
  tokenMiddleware.auth,
  favoriteController.getFavoritesOfUser
);

// [POST] /api/v1/user/favorites
router.post(
  "/favorites",
  tokenMiddleware.auth,
  body("mediaType")
    .exists()
    .withMessage("mediatype is required")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("mediaType invalid"),
  body("mediaId")
    .exists()
    .withMessage("mediaId is required")
    .isLength({ min: 1 })
    .withMessage("mediaId can not be empty"),
  body("mediaTitle").exists().withMessage("mediaTitle is required"),
  body("mediaPoster").exists().withMessage("mediaPoster us requied"),
  body("mediaRate").exists().withMessage("mediaRate is required"),
  requestHandler.validate,
  favoriteController.addFavorite
);

// [DELETE] /api/v1/user/favorites/:favoriteId
router.delete(
  "/favorites/:favoriteId",
  tokenMiddleware.auth,
  favoriteController.removeFavorite
);

export default router;
