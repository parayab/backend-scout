module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
    "role",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name can't be empty"
          }
        }
      }
    },
    {}
  );
  // eslint-disable-next-line func-names
  role.associate = function(models) {
    role.hasMany(models.user, {
      onDelete: "CASCADE",
      foreignKey: "roleId"
    });
  };
  return role;
};
