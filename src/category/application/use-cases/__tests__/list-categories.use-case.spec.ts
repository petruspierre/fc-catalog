import { Category } from "../../../domain/entities/category";
import CategoryRepository from "../../../domain/repository/category.repository";
import CategoryInMemoryRepository from "../../../infra/repository/category-in-memory.repository";
import { ListCategoriesUseCase } from "../list-categories.use-case";

describe("ListCategoriesUseCase Unit Tests", () => {
  let useCase: ListCategoriesUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new ListCategoriesUseCase(repository);
  });

  test("toOutput method", () => {
    let result = new CategoryRepository.SearchResult({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 1,
      sort: null,
      sort_dir: null,
      filter: null,
    });
    let output = useCase["toOutput"](result);

    expect(output).toStrictEqual({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 1,
      last_page: 1,
    });

    const entity = new Category({
      name: "Movie",
    });

    result = new CategoryRepository.SearchResult({
      items: [entity],
      total: 1,
      current_page: 1,
      per_page: 1,
      sort: null,
      sort_dir: null,
      filter: null,
    });
    output = useCase["toOutput"](result);

    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      current_page: 1,
      per_page: 1,
      last_page: 1,
    });
  });

  it("should return output when using empty input with categories ordered by created_at", async () => {
    const items = [
      new Category({
        name: "Category 1",
        created_at: new Date("2021-01-01"),
      }),
      new Category({
        name: "Category 2",
        created_at: new Date("2022-01-01"),
      }),
    ];

    repository.items = items;

    const output = await useCase.execute({});

    expect(output).toStrictEqual({
      items: [items[1].toJSON(), items[0].toJSON()],
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });

  it('should return output using pagination, sort and filter', async() => {
    const items = [
      new Category({
        name: "a",
      }),
      new Category({
        name: "AAA",
      }),
      new Category({
        name: "AaA",
      }),
      new Category({
        name: "b",
      }),
      new Category({
        name: "c",
      }),
    ];

    repository.items = items;

    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: 'name',
      filter: 'a'
    });

    expect(output).toStrictEqual({
      items: [
        items[1].toJSON(),
        items[2].toJSON()
      ],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 2,
      per_page: 2,
      sort: 'name',
      filter: 'a'
    });

    expect(output).toStrictEqual({
      items: [
        items[0].toJSON(),
      ],
      total: 3,
      current_page: 2,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc',
      filter: 'a'
    });

    expect(output).toStrictEqual({
      items: [
        items[0].toJSON(),
        items[2].toJSON(),
      ],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });
  })
});
