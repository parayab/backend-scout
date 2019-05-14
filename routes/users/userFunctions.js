module.exports = {
  create: async function(ctx, requestBody) {
    //  requestBody = {
    //     surname1: string,
    //     surname2: string,
    //     name1: string,
    //     name2: string,
    //     email: string,
    //     birthdate: date,
    //     address: string,
    //     roleId: int,
    //     sectionId: int
    //     groupId: int }
    const newUser = ctx.orm.user.build(requestBody);
    try {
      await newUser.save({
        fields: [
          "surname1",
          "surname2",
          "name1",
          "name2",
          "email",
          "birthdate",
          "address",
          "rolId",
          "sectionId",
          "groupId"
        ]
      });
      return { newUser };
    } catch (validationError) {
      return validationError;
    }
  }
};
