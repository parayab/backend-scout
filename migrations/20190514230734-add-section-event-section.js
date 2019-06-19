module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addConstraint("sectionEvents", ["sectionId"], {
      type: "foreign key",
      name: "section_event_belongs_to_section",
      references: {
        table: "sections",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.removeConstraint(
      "sectionEvents",
      "section_event_belongs_to_section"
    )
};
