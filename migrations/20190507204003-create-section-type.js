module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("sectionTypes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      minAge: {
        type: Sequelize.INTEGER
      },
      maxAge: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: queryInterface => queryInterface.dropTable("sectionTypes")
};
