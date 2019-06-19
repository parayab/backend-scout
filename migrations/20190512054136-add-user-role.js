module.exports = {
  up: queryInterface =>
    queryInterface.addConstraint("users", ["roleId"], {
      type: "foreign key",
      name: "user_belongs_to_role",
      references: {
        table: "roles",
        field: "id"
      },
      onDelete: "set null",
      onUpdate: "cascade"
    }),
  down: queryInterface =>
    queryInterface.removeConstraint("users", "user_belongs_to_role")
};
