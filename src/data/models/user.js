export default (dbService, sequelize) => {
  const User = dbService.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: sequelize.INTEGER,
    },
    userid: {
      type: sequelize.INTEGER,
    },
    email: {
      type: sequelize.STRING(100),
      unique: true,
      allowNull: false,
    },
    firstname: {
      type: sequelize.STRING(250),
      allowNull: false,
    },
    lastname: {
      type: sequelize.STRING(250),
      allowNull: false,
    },
    avatar: {
      type: sequelize.STRING(250),
      allowNull: false,
    },
  });

  return User;
};
