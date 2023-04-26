import { Category } from "#category/domain/entities";
import { NotFoundError } from "#seedwork/domain/errors";
import { CategoryInMemoryRepository } from "#category/infra";
import { UpdateCategoryUseCase } from "../update-category.use-case";

describe("UpdateCategoryUseCase Unit Tests", () => {
  let useCase: UpdateCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new UpdateCategoryUseCase.UseCase(repository);
  });

  it("should throw error when entity is not found", async () => {
    await expect(() =>
      useCase.execute({ id: "fake-id", name: "fake" })
    ).rejects.toThrowError(
      new NotFoundError(`Entity not found using ID fake-id`)
    );
  });

  it("should update a category", async () => {
    const spyUpdate = jest.spyOn(repository, "update");
    const entity = new Category({
      name: "Category 1",
    });
    repository.items = [entity];

    type Arrange = {
      entity: {
        id: string;
        name: string;
        description?: string | null;
        is_active?: boolean;
      };
      expected: {
        id: string;
        name: string;
        description: string | null;
        is_active: boolean;
        created_at: Date;
      };
    }
    let arrange: Arrange[] = [
      {
        entity: {
          id: entity.id,
          name: "Category 2",
        },
        expected: {
          id: entity.id,
          name: "Category 2",
          description: null,
          is_active: true,
          created_at: entity.created_at,
        },
      },
      {
        entity: {
          id: entity.id,
          name: "Category 2",
          description: "Description",
          is_active: false,
        },
        expected: {
          id: entity.id,
          name: "Category 2",
          description: "Description",
          is_active: false,
          created_at: entity.created_at,
        },
      },
      {
        entity: {
          id: entity.id,
          name: "Category 2",
        },
        expected: {
          id: entity.id,
          name: "Category 2",
          description: null,
          is_active: false,
          created_at: entity.created_at,
        },
      },
      {
        entity: {
          id: entity.id,
          name: "Category 2",
          is_active: true,
        },
        expected: {
          id: entity.id,
          name: "Category 2",
          description: null,
          is_active: true,
          created_at: entity.created_at,
        },
      },
      {
        entity: {
          id: entity.id,
          name: "Category 1",
          description: 'Description 2',
        },
        expected: {
          id: entity.id,
          name: "Category 1",
          description: 'Description 2',
          is_active: true,
          created_at: entity.created_at,
        },
      },
    ];
    
    for(const item of arrange) {
      const result = await useCase.execute(item.entity);
      expect(result).toStrictEqual(item.expected);
    }
    expect(spyUpdate).toBeCalledTimes(arrange.length);
  });
});
