module.exports = {
  up: queryInterface =>
    queryInterface.addConstraint("groupTransactions", ["groupId"], {
      type: "foreign key",
      name: "group_transaction_belongs_to_group",
      references: {
        table: "groups",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    }),

  down: queryInterface =>
    queryInterface.removeConstraint(
      "groupTransactions",
      "group_transaction_belongs_to_group"
    )
};
