import sequelize from '../DB/database.js';
import User from './user.js';
import Post from './post.js';

sequelize.sync({ force: false }) 
  .then(() => console.log('Database & tables created!'))
  .catch((err) => console.log('Error syncing database:', err));

export { User, Post };
