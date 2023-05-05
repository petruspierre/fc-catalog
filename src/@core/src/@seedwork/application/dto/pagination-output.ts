import { SearchResult } from '../../domain/repository/repository-contracts';

export type PaginationOutputDto<Items = any> = {
  items: Items[];
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
};

export class PaginationOutputMapper {
  static toOutput(result: SearchResult): Omit<PaginationOutputDto, 'items'> {
    return {
      current_page: result.current_page,
      last_page: result.last_page,
      per_page: result.per_page,
      total: result.total,
    };
  }
}
