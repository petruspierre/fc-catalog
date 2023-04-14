import { Category } from "#category/domain/entities";
import { CategoryOutputMapper } from "./category-output";

describe("CategoryOutputMapper Unit Tests", () => {
  it("should convert a category into a output", () => {
    const created_at = new Date();

    const entity = new Category({
      name: "Category 1",
      description: "Some description",
      is_active: true,
      created_at,
    });
    const spyToJSON = jest.spyOn(entity, "toJSON");

    const output = CategoryOutputMapper.toOutput(entity);

    expect(spyToJSON).toHaveBeenCalled();
    expect(output).toStrictEqual({
      id: entity.id,
      name: "Category 1",
      description: "Some description",
      is_active: true,
      created_at,
    });
  });
});
