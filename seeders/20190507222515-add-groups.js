module.exports = {
  up: queryInterface => {
    const groups = [
      {
        name: "First group",
        foundationDate: new Date(1995, 10, 13),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    return queryInterface.bulkInsert("groups", groups, {});
  },

  down: queryInterface => queryInterface.bulkDelete("groups", null, {})
};
