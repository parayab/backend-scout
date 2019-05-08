module.exports = {
  up: queryInterface => {
    const sectionTypes = [
      {
        name: "Section 1",
        minAge: 7,
        maxAge: 10,
        description: "Description: section 1",
        gender: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Section 2",
        minAge: 11,
        maxAge: 15,
        description: "Description: section 2",
        gender: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Section 3",
        minAge: 17,
        maxAge: 20,
        description: "Description: section 3",
        gender: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    return queryInterface.bulkInsert("sectionTypes", sectionTypes, {});
  },

  down: queryInterface => queryInterface.bulkDelete("sectionTypes", null, {})
};
