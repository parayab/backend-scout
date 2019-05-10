module.exports = {
  up: queryInterface => {
    const sectionTypes = [
      {
        name: "Bandada",
        minAge: 7,
        maxAge: 11,
        description: "Description: section 1",
        gender: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Manada",
        minAge: 7,
        maxAge: 11,
        description: "Description: section 2",
        gender: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Compañía",
        minAge: 11,
        maxAge: 15,
        description: "Description: section 3",
        gender: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Tropa",
        minAge: 11,
        maxAge: 15,
        description: "Description: section 4",
        gender: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Avanzada",
        minAge: 15,
        maxAge: 17,
        description: "Description: section 5",
        gender: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Clan",
        minAge: 17,
        maxAge: 21,
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
