import { DataTypes } from 'sequelize';
import sequelize from '../DB/database.js';
import User from './user.js';

const Post = sequelize.define('Post', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  imageURL: { type: DataTypes.STRING },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

Post.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

export default Post
