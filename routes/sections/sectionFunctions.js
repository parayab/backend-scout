module.exports = {
  async create(ctx, requestBody) {
    // requestBody = {name: string, typeId: int, groupId: int}
    const newSection = ctx.orm.section.build(requestBody);
    try {
      await newSection.save({ fields: ["name", "typeId", "groupId"] });
      const sections = await ctx.orm.section.findAll({
        where: { groupId: ctx.params.group_id },
        offset: 1
      });
      return { sections };
    } catch (validationError) {
      return { errors: validationError.errors };
    }
  }
};
