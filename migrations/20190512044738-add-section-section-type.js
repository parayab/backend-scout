"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addConstraint("sections", ["typeId"], {
      type: "foreign key",
      name: "section_belongs_to_section_type",
      references: {
        table: "sectionTypes",
        field: "id"
      },
      onDelete: "set null",
      onUpdate: "cascade"
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.removeConstraint("sections", "section_belongs_to_section_type")
};

