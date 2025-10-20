import responseHandler from "../handlers/response.handler.js";
import dbApi from "../database/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

// [GET] /api/v1/:mediaType/:mediaCategory/:mediaType?page=
const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;

    const response = await dbApi.mediaList({ mediaType, mediaCategory, page });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

// [GET] /api/v1/:mediaType/genres
const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;

    const response = await dbApi.mediaGenres({ mediaType });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;

    const response = await dbApi.mediaSearch({
      query,
      page,
      mediaType: mediaType === "people" ? "person" : mediaType,
    });

    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

// [GET] /api/v1/:mediaType/detail/:mediaId
const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;

    const params = { mediaType, mediaId };

    const media = await dbApi.mediaDetail(params);

    media.credits = await dbApi.mediaCredits(params);

    const videos = await dbApi.mediaVideos(params);

    media.videos = videos;

    const recommend = await dbApi.mediaRecommend(params);

    media.recommend = recommend.results;

    media.images = await dbApi.mediaImages(params);

    const tokenDecoded = tokenMiddleware.tokenDecode(req);

    if (tokenDecoded) {
      const user = await userModel.findByPk(tokenDecoded.data);

      if (user) {
        const isFavorite = await favoriteModel.findOne({
          where: {
            userId: user.userId,
            mediaId,
          },
        });

        media.isFavorite = isFavorite !== null;
      }
    }

    media.reviews = await reviewModel.findAll({
      where: { mediaId }, // Lọc theo mediaId
      include: [
        {
          model: userModel,
          as: "Users",
          attributes: ["username"],
        },
      ],
      order: [["createdAt", "DESC"]], // Sắp xếp theo thứ tự giảm dần
    });

    responseHandler.ok(res, media);
  } catch (err) {
    console.error("Error in get detail: ", err.message || err);
    responseHandler.error(res);
  }
};

export default { getList, getGenres, search, getDetail };
