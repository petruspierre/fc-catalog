import { InMemorySearchableRepository, SortDirection } from "#seedwork/domain/repository";
import { Category } from "#category/domain/entities";
import { CategoryRepository } from "#category/domain/repository";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.Repository
{
  sortableFields: string[] = ["name", "created_at"];

  protected async applyFilter(
    items: Category[],
    filter: CategoryRepository.Filter
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: Category[],
    sort: string,
    sort_dir: SortDirection
  ): Promise<Category[]> {
    if (!sort) {
      return super.applySort(items, "created_at", "desc");
    } else {
      return super.applySort(items, sort, sort_dir);
    }
  }
}
