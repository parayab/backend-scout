module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addConstraint("groupEvents", ["groupId"], {
      type: "foreign key",
      name: "group_event_belongs_to_group",
      references: {
        table: "groups",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    }),

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint(
      "groupEvents",
      "group_event_belongs_to_group"
    );
  }
};
