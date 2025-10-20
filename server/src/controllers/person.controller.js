import responseHandler from "../handlers/response.handler.js";
import dbApi from "../database/tmdb.api.js";

//[GET] /api/v1/person/:personId
const personDetail = async (req, res) => {
  try {
    const { personId } = req.params;

    const person = await dbApi.personDetail({ personId });

    responseHandler.ok(res, person);
  } catch (err) {
    console.error("Error in person detail: ", err.message || err);
    responseHandler.error(res);
  }
};

//[GET] /api/v1/person/:personId/medias
const personMedias = async (req, res) => {
  try {
    const { personId } = req.params;

    const medias = await dbApi.personMedias({ personId });

    responseHandler.ok(res, medias);
  } catch (err) {
    console.error("Error in person medias: ", err.message || err);
    responseHandler.error(res);
  }
};

export default { personDetail, personMedias };
