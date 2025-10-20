import sequelize from "../database/db.connect.js";
import User from "./user.model.js";
import Review from "./review.model.js";
import Favorite from "./favorite.model.js";

// Thiết lập mối quan hệ
User.hasMany(Review, { foreignKey: "userId", as: "Reviews" });
Review.belongsTo(User, { foreignKey: "userId", as: "Users" });

User.hasMany(Favorite, { foreignKey: "userId", as: "Favorites" });
Favorite.belongsTo(User, { foreignKey: "userId", as: "Users" });

export default sequelize; // Đảm bảo xuất instance
export { User, Review, Favorite };
