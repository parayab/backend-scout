module.exports = {
  up: queryInterface => {
    const roles = [
      {
        name: "Admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Group leader",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Group assistant",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Section leader",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Section assistant",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Children",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    return queryInterface.bulkInsert("roles", roles, {});
  },

  down: queryInterface => queryInterface.bulkDelete("roles", null, {})
};
