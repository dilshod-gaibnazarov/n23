import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";

const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    }
});

export default Post;
