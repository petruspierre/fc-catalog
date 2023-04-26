import { Category } from "#category/domain/entities";
import { NotFoundError } from "#seedwork/domain/errors";
import {CategoryInMemoryRepository} from "#category/infra/repository";
import { GetCategoryUseCase } from "../get-category.use-case";

describe("GetCategoryUseCase Unit Tests", () => {
  let useCase: GetCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new GetCategoryUseCase.UseCase(repository);
  });

  it("should throw error when entity is not found", async () => {
    await expect(() => useCase.execute({ id: "fake-id" })).rejects.toThrowError(
      new NotFoundError(`Entity not found using ID fake-id`)
    );
  });

  it('should return a category', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');
    const items = [
      new Category({
        name: 'Category 1',
      })
    ]
    repository.items = items;

    const output = await useCase.execute({ id: items[0].id });

    expect(output).toStrictEqual({
      id: items[0].id,
      name: 'Category 1',
      description: null,
      is_active: true,
      created_at: items[0].created_at
    })
    expect(spyFindById).toBeCalledTimes(1);
  })
});
