import { ListCategoriesUseCase } from '@pp/core/category/application';
import { SortDirection } from '@pp/core/@seedwork/domain';

export class SearchCategoryDto implements ListCategoriesUseCase.Input {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: string;
}
