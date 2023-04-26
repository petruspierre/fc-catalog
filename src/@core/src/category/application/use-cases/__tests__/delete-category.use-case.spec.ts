import { Category } from "#category/domain/entities";
import { NotFoundError } from "#seedwork/domain/errors/not-found.error";
import { CategoryInMemoryRepository } from "#category/infra/repository";
import { DeleteCategoryUseCase } from "../delete-category.use-case";

describe("DeleteCategoryUseCase Unit Tests", () => {
  let useCase: DeleteCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase.UseCase(repository);
  });

  it("should throw error when entity is not found", async () => {
    await expect(() => useCase.execute({ id: "fake-id" })).rejects.toThrowError(
      new NotFoundError(`Entity not found using ID fake-id`)
    );
  });

  it("should delete a category", async () => {
    const spyDelete = jest.spyOn(repository, "delete");
    const entity = new Category({
      name: "Category 1",
    });
    repository.items = [entity];

    await useCase.execute({ id: entity.id });

    expect(spyDelete).toBeCalledTimes(1);
    expect(spyDelete).toBeCalledWith(entity.id);
    expect(repository.items.length).toBe(0);
  });
});
