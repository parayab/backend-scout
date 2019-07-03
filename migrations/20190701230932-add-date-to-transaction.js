module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn("groupTransactions", "date", {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false
    }),

  down: queryInterface =>
    queryInterface.removeColumn("groupTransactions", "date")
};
