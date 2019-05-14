module.exports = {
  up: queryInterface => {
    const sections = [
      {
        name: "First section",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    return queryInterface.bulkInsert("sections", sections, {});
  },

  down: queryInterface => queryInterface.bulkDelete("sections", null, {})
};
