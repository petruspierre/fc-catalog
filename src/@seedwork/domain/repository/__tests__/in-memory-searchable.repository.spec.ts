import Entity from "../../entity/entity";
import { InMemorySearchableRepository } from "../in-memory.repository";
import { SearchParams, SearchResult } from "../repository-contracts";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ["name"];

  protected async applyFilter(
    items: StubEntity[],
    filter: string
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return (
        i.props.name.toLowerCase().includes(filter.toLowerCase()) ||
        i.props.price.toString() === filter
      );
    });
  }
}

describe("InMemorySearchableRepository Unit Tests", () => {
  let repository: StubInMemorySearchableRepository;

  beforeEach(() => {
    repository = new StubInMemorySearchableRepository();
  });

  describe("applyFilter method", () => {
    it("should not filter when filter is null", async () => {
      const items = [
        new StubEntity({ name: "test", price: 1 }),
        new StubEntity({ name: "test2", price: 2 }),
      ];

      const spyFilterMethod = jest.spyOn(items, "filter");

      const result = await repository["applyFilter"](items, null);

      expect(result).toStrictEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();
    });

    it("should filter using the filter param", async () => {
      const items = [
        new StubEntity({ name: "test", price: 1 }),
        new StubEntity({ name: "test2", price: 2 }),
        new StubEntity({ name: "TEST", price: 3 }),
        new StubEntity({ name: "fake", price: 4 }),
      ];

      const spyFilterMethod = jest.spyOn(items, "filter");

      let result = await repository["applyFilter"](items, "TEST");
      expect(result).toStrictEqual([items[0], items[1], items[2]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(1);

      result = await repository["applyFilter"](items, "2");
      expect(result).toStrictEqual([items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(2);

      result = await repository["applyFilter"](items, "no-match");
      expect(result.length).toBe(0);
      expect(spyFilterMethod).toHaveBeenCalledTimes(3);
    });
  });

  describe("applySort method", () => {
    it("should not sort when sort is null or non sortable", async () => {
      const items = [
        new StubEntity({ name: "test", price: 1 }),
        new StubEntity({ name: "test2", price: 2 }),
      ];

      const spySortMethod = jest.spyOn(items, "sort");

      let result = await repository["applySort"](items, null, null);
      expect(result).toStrictEqual(items);
      expect(spySortMethod).not.toHaveBeenCalled();

      result = await repository["applySort"](items, "price", null);
      expect(result).toStrictEqual(items);
      expect(spySortMethod).not.toHaveBeenCalled();
    });

    it("should sort items", async () => {
      const items = [
        new StubEntity({ name: "a", price: 1 }),
        new StubEntity({ name: "b", price: 2 }),
        new StubEntity({ name: "c", price: 3 }),
        new StubEntity({ name: "d", price: 4 }),
      ];

      let result = await repository["applySort"](items, "name", "asc");
      expect(result).toStrictEqual([items[0], items[1], items[2], items[3]]);

      result = await repository["applySort"](items, "name", "desc");
      expect(result).toStrictEqual([items[3], items[2], items[1], items[0]]);
    });
  });

  describe("applyPaginate method", () => {
    it("should paginate items", async () => {
      const items = [
        new StubEntity({ name: "a", price: 1 }),
        new StubEntity({ name: "b", price: 2 }),
        new StubEntity({ name: "c", price: 3 }),
        new StubEntity({ name: "d", price: 4 }),
      ];

      let result = await repository["applyPaginate"](items, 1, 2);
      expect(result).toStrictEqual([items[0], items[1]]);

      result = await repository["applyPaginate"](items, 2, 2);
      expect(result).toStrictEqual([items[2], items[3]]);

      result = await repository["applyPaginate"](items, 3, 2);
      expect(result).toStrictEqual([]);
    });
  });

  describe("search method", () => {
    it("should apply only paginate when other params are null", async () => {
      const entity = new StubEntity({ name: "test", price: 1 });
      const items = Array(16).fill(entity);
      repository.items = items;

      const result = await repository.search(new SearchParams());

      expect(result).toStrictEqual(
        new SearchResult({
          items: Array(15).fill(entity),
          total: 16,
          current_page: 1,
          per_page: 15,
          sort: null,
          filter: null,
          sort_dir: null,
        })
      );
    });

    it("should apply paginate and filter", async () => {
      const items = [
        new StubEntity({ name: "test", price: 5 }),
        new StubEntity({ name: "fake", price: 5 }),
        new StubEntity({ name: "TEST", price: 5 }),
        new StubEntity({ name: "TeSt", price: 5 }),
      ];
      repository.items = items;

      let result = await repository.search(
        new SearchParams({
          page: 1,
          per_page: 2,
          filter: "TEST",
        })
      );

      expect(result).toStrictEqual(
        new SearchResult({
          items: [items[0], items[2]],
          total: 3,
          current_page: 1,
          per_page: 2,
          sort: null,
          filter: "TEST",
          sort_dir: null,
        })
      );

      result = await repository.search(
        new SearchParams({
          page: 2,
          per_page: 2,
          filter: "TEST",
        })
      );

      expect(result).toStrictEqual(
        new SearchResult({
          items: [items[3]],
          total: 3,
          current_page: 2,
          per_page: 2,
          sort: null,
          filter: "TEST",
          sort_dir: null,
        })
      );
    });

    it("should apply paginate and sort", async () => {
      const items = [
        new StubEntity({ name: "b", price: 5 }),
        new StubEntity({ name: "a", price: 5 }),
        new StubEntity({ name: "d", price: 5 }),
        new StubEntity({ name: "e", price: 5 }),
        new StubEntity({ name: "c", price: 5 }),
      ];
      repository.items = items;

      const arrange = [
        {
          params: new SearchParams({
            page: 1,
            per_page: 2,
            sort: "name",
          }),
          result: new SearchResult({
            items: [items[1], items[0]],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: "name",
            filter: null,
            sort_dir: "asc",
          }),
        },
        {
          params: new SearchParams({
            page: 2,
            per_page: 2,
            sort: "name",
          }),
          result: new SearchResult({
            items: [items[4], items[2]],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: "name",
            filter: null,
            sort_dir: "asc",
          }),
        },
        {
          params: new SearchParams({
            page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
          }),
          result: new SearchResult({
            items: [items[3], items[2]],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: "name",
            filter: null,
            sort_dir: "desc",
          }),
        },
        {
          params: new SearchParams({
            page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
          }),
          result: new SearchResult({
            items: [items[4], items[0]],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: "name",
            filter: null,
            sort_dir: "desc",
          }),
        },
      ];

      for(const i of arrange) {
        const result = await repository.search(i.params)
        expect(result).toStrictEqual(i.result);
      }
    });
  });

  it("should apply paginate, sort and filter", async () => {
    const items = [
      new StubEntity({ name: "test", price: 5 }),
      new StubEntity({ name: "a", price: 5 }),
      new StubEntity({ name: "TEST", price: 5 }),
      new StubEntity({ name: "e", price: 5 }),
      new StubEntity({ name: "TeSt", price: 5 }),
    ];
    repository.items = items;

    const arrange = [
      {
        params: new SearchParams({
          page: 1,
          per_page: 2,
          sort: "name",
          filter: 'test'
        }),
        result: new SearchResult({
          items: [items[2], items[4]],
          total: 3,
          current_page: 1,
          per_page: 2,
          sort: "name",
          filter: 'test',
          sort_dir: "asc",
        }),
      },
      {
        params: new SearchParams({
          page: 2,
          per_page: 2,
          sort: "name",
          filter: 'test'
        }),
        result: new SearchResult({
          items: [items[0]],
          total: 3,
          current_page: 2,
          per_page: 2,
          sort: "name",
          filter: 'test',
          sort_dir: "asc",
        }),
      },
    ];

    for(const i of arrange) {
      const result = await repository.search(i.params)
      expect(result).toStrictEqual(i.result);
    }
  });
});
