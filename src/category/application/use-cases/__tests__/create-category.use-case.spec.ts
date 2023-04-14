import { CategoryInMemoryRepository } from "#category/infra/repository";
import { CreateCategoryUseCase } from "../create-category.use-case"

describe('CreateCategoryUseCase Unit Tests', () => {
  let useCase: CreateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase(repository);
  })

  it('should create a category', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');
    let output = await useCase.execute({
      name: 'Category 1'
    });

    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'Category 1',
      description: null,
      is_active: true,
      created_at: repository.items[0].created_at
    })
    expect(spyInsert).toBeCalledTimes(1);

    output = await useCase.execute({
      name: 'Category 2',
      description: 'Description',
      is_active: false
    });

    expect(output).toStrictEqual({
      id: repository.items[1].id,
      name: 'Category 2',
      description: 'Description',
      is_active: false,
      created_at: repository.items[1].created_at
    })
    expect(spyInsert).toBeCalledTimes(2);
  })
})