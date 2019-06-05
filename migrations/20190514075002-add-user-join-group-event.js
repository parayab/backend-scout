module.exports = {
  up: queryInterface =>
    queryInterface
      .addConstraint("userJoinGroupEvents", ["groupEventId"], {
        type: "foreign key",
        name: "groupEvent_hasMany_userJoin",
        references: {
          table: "groupEvents",
          field: "id"
        },
        onDelete: "set null",
        onUpdate: "cascade"
      })
      .then(() =>
        queryInterface.addConstraint("userJoinGroupEvents", ["userId"], {
          type: "foreign key",
          name: "user_hasMany_userJoin",
          references: {
            table: "users",
            field: "id"
          },
          onDelete: "set null",
          onUpdate: "cascade"
        })
      )
      .then(() =>
        queryInterface.addConstraint(
          "userJoinGroupEvents",
          ["userId", "groupEventId"],
          {
            type: "unique",
            name: "unique_userid_eventgroupid"
          }
        )
      ),

  down: queryInterface =>
    queryInterface
      .removeConstraint("userJoinGroupEvents", "groupEvent_hasMany_userJoin")
      .then(() =>
        queryInterface.removeConstraint(
          "userJoinGroupEvents",
          "user_hasMany_userJoin"
        )
      )
      .then(() =>
        queryInterface.removeConstraint(
          "userJoinGroupEvents",
          "unique_userid_eventgroupid"
        )
      )
};
