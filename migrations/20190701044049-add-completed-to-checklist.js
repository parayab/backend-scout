module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn("checklists", "completed", {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }),

  down: queryInterface => queryInterface.removeColumn("checklists", "completed")
};
