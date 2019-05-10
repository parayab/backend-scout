"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addConstraint("groups", ["leaderId"], {
      type: "foreign key",
      name: "group_belongs_to_leader",
      references: {
        table: "users",
        field: "id"
      },
      onDelete: "set null",
      onUpdate: "cascade"
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.removeConstraint("groups", "group_belongs_to_leader")
};
