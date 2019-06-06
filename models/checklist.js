module.exports = (sequelize, DataTypes) => {
  const checklist = sequelize.define(
    "checklist",
    {
      name: DataTypes.STRING
    },
    {}
  );
  checklist.associate = function() {};
  return checklist;
};
