export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      prenom: DataTypes.STRING,
      nom: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      emailToken: DataTypes.STRING
    });
  
    return User;
  };
  