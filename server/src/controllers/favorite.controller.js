import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/favorite.model.js";

// [POST] /api/v1/user/favorites
const addFavorite = async (req, res) => {
  try {
    const isFavorit = await favoriteModel.findOne({
      where: {
        userId: req.user.userId,
        mediaId: req.body.mediaId,
      },
    });

    if (isFavorit) return responseHandler.ok(res, isFavorit);

    const favorite = await favoriteModel.create({
      ...req.body,
      userId: req.user.userId,
    });

    responseHandler.created(res, favorite);
  } catch (err) {
    console.error("Error in addFavorite:", err.message || err);
    responseHandler.error(res);
  }
};

// [DELETE] /api/v1/user/favorites/:favoriteId
const removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;

    const favorite = await favoriteModel.findOne({
      where: {
        userId: req.user.userId,
        favoriteId: favoriteId,
      },
    });

    if (!favorite) return responseHandler.notfound(res);

    await favorite.destroy();

    responseHandler.ok(res);
  } catch (err) {
    console.error("Error in remove favorite: ", err.message || err);
    responseHandler.error(res);
  }
};

// [GET] /api/v1/user/favorites
const getFavoritesOfUser = async (req, res) => {
  try {
    const favorite = await favoriteModel.findAll({
      where: {
        userId: req.user.userId,
      },
      order: [["createdAt", "DESC"]],
    });

    responseHandler.ok(res, favorite);
  } catch (err) {
    console.error("Error in getFavorites of User:", err.message || err);
    responseHandler.error(res);
  }
};

export default { addFavorite, removeFavorite, getFavoritesOfUser };
