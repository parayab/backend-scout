module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addConstraint("sections", ["groupId"], {
      type: "foreign key",
      name: "section_belongs_to_group",
      references: {
        table: "groups",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.removeConstraint("sections", "section_belongs_to_group")
};
