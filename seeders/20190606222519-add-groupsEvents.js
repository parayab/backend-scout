module.exports = {
  up: queryInterface => {
    const groupEvents = [
      {
        groupId: 1,
        name: "grupoeventouno",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    return queryInterface.bulkInsert("groupEvents", groupEvents, {});
  },

  down: queryInterface => queryInterface.bulkDelete("groupEvents", null, {})
};
