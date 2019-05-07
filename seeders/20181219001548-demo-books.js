module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      "books",
      [
        {
          name: "The Republic",
          author: "Plato",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "1984",
          author: "George Orwell",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Divine Comedy",
          author: "Dante Alighieri",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Critique of Pure Reason",
          author: "Immanuel Kant",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "The Meaning of Relativity",
          author: "Albert Einstein",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete("books", null, {})
};
