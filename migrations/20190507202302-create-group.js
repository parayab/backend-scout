module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("groups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      foundationDate: {
        type: Sequelize.DATE
      },
      leaderId: {
        type: Sequelize.INTEGER
      },
      assistantId: {
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
  down: queryInterface => queryInterface.dropTable("groups")
};
