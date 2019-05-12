"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addConstraint("users", ["sectionId"], {
      type: "foreign key",
      name: "user_belongs_to_section",
      references: {
        table: "sections",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.removeConstraint("users", "user_belongs_to_section")
};
