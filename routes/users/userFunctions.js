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
  },
  patch: async function(ctx, requestBody) {
    try {
      const editUser = await ctx.orm.user.findOne({
        where: {
          id: ctx.params.user_id
        }
      });
      const validSections = await ctx.orm.section.findAll({
        where: { groupId: ctx.params.group_id }
      });
      const validIds = validSections.map(section => section.id);

      Object.keys(requestBody).forEach(field => {
        if (field === "id") {
          if (validIds.includes(requestBody[field])) {
            editUser[field] = requestBody[field];
          } else {
            throw ValidationError("Novalido");
          }
        } else {
          editUser[field] = requestBody[field];
        }
      });
      await editUser.save();
      return editUser;
    } catch (validationError) {
      return validationError;
    }
  }
};
