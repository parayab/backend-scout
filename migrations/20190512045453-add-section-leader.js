"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addConstraint("sections", ["leaderId"], {
      type: "foreign key",
      name: "section_belongs_to_leader",
      references: {
        table: "users",
        field: "id"
      },
      onDelete: "set null",
      onUpdate: "cascade"
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.removeConstraint("sections", "section_belongs_to_leader")
};
