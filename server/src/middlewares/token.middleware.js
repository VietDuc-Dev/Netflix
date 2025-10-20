import jsonwebtoken from "jsonwebtoken"; //Được sử dụng để tạo và xác thực json web token
import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";

const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];

      return jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    }

    return false;
  } catch {
    return false;
  }
};

const auth = async (req, res, next) => {
  try {
    const tokenDecoded = tokenDecode(req);

    if (!tokenDecoded) return responseHandler.unauthorize(res);

    const user = await userModel.findByPk(tokenDecoded.data);

    if (!user) return responseHandler.unauthorize(res);

    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return responseHandler.notfound(res, "Authentication failed");
  }
};

export default { auth, tokenDecode };
