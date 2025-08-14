import User from './user.model.js';
import Post from './post.model.js';

User.hasMany(Post, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'userId' });

export { User, Post };
