import { SearchParams, SearchResult } from '#seedwork/domain/repository';
import { Category } from '#category/domain/entities';
import { CategoryInMemoryRepository } from './category-in-memory.repository';

describe('CategoryInMemoryRepository Unit Tests', () => {
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
  });

  describe('search category', () => {
    it('should paginate result', async () => {
      const created_at = new Date();
      repository.items = [
        new Category({
          name: 'Category 1',
          created_at,
        }),
        new Category({
          name: 'Category 2',
          created_at,
        }),
      ];

      const result = await repository.search(
        new SearchParams({
          page: 1,
          per_page: 1,
        }),
      );

      expect(result).toStrictEqual(
        new SearchResult({
          current_page: 1,
          filter: null,
          items: [repository.items[0]],
          per_page: 1,
          sort: null,
          sort_dir: null,
          total: 2,
        }),
      );
    });

    it('should filter category by name', async () => {
      repository.items = [
        new Category({
          name: 'Category A',
        }),
        new Category({
          name: 'Category B',
        }),
      ];

      const result = await repository.search(
        new SearchParams({
          filter: 'Category',
        }),
      );

      expect(result.items).toStrictEqual([
        repository.items[0],
        repository.items[1],
      ]);
    });

    it('should sort category by name', async () => {
      repository.items = [
        new Category({
          name: 'Category A',
        }),
        new Category({
          name: 'Category B',
        }),
      ];

      const result = await repository.search(
        new SearchParams({
          sort: 'name',
          sort_dir: 'desc',
        }),
      );

      expect(result.items).toStrictEqual([
        repository.items[1],
        repository.items[0],
      ]);
    });

    it('should sort by created_at by default', async () => {
      repository.items = [
        new Category({
          name: 'Category 1',
          created_at: new Date('2021-01-01'),
        }),
        new Category({
          name: 'Category 2',
          created_at: new Date('2022-01-01'),
        }),
      ];

      const result = await repository.search(
        new SearchParams({
          sort: null,
          sort_dir: null,
        }),
      );

      expect(result.items).toStrictEqual([
        repository.items[1],
        repository.items[0],
      ]);
    });
  });
});
