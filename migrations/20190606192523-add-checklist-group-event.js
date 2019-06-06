module.exports = {
  up: queryInterface =>
    queryInterface.addConstraint("checklists", ["groupEventId"], {
      type: "foreign key",
      name: "checklist_belongs_to_group_event",
      references: {
        table: "groupEvents",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    }),

  down: queryInterface =>
    queryInterface.removeConstraint(
      "checklists",
      "checklist_belongs_to_group_event"
    )
};
