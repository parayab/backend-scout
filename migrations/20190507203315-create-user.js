module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      surname1: {
        type: Sequelize.STRING
      },
      surname2: {
        type: Sequelize.STRING
      },
      name1: {
        type: Sequelize.STRING
      },
      name2: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATE
      },
      address: {
        type: Sequelize.STRING
      },
      roleId: {
        type: Sequelize.INTEGER
      },
      sectionId: {
        type: Sequelize.INTEGER
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
  down: queryInterface => queryInterface.dropTable("users")
};
