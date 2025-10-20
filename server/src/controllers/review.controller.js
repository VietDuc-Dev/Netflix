import responseHandler from "../handlers/response.handler.js";
import reviewsModel from "../models/review.model.js";

//[POST] /api/v1/reviews
const create = async (req, res) => {
  try {
    const { movieId } = req.params;

    const review = await reviewsModel.create({
      userId: req.user.userId,
      movieId,
      ...req.body,
    });

    responseHandler.created(res, {
      ...review.toJSON(),
      Users: { username: req.user.username },
    });
  } catch (err) {
    console.error("Error in create review: ", err.message || err);
    responseHandler.error(res);
  }
};

//[DELETE] /api/v1/:reviewId
const remove = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await reviewsModel.findOne({
      where: {
        reviewId: reviewId,
        userId: req.user.userId,
      },
    });

    if (!review) return responseHandler.notfound(res);

    await review.destroy();

    responseHandler.ok(res);
  } catch (err) {
    console.error("Error in remove reviews: ", err.message || err);
    responseHandler.error(res);
  }
};

//[GET] /api/v1/reviews
const getReviewsOfUser = async (req, res) => {
  try {
    const reviews = await reviewsModel.findAll({
      where: {
        userId: req.user.userId,
      },
      order: [["createdAt", "DESC"]],
    });

    responseHandler.ok(res, reviews);
  } catch (err) {
    console.error("Error in get reviews of user: ", err.message || err);
    responseHandler.error(res);
  }
};

export default { create, remove, getReviewsOfUser };
