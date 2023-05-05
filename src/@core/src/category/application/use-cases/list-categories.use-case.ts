import { UseCase as DefaultUseCase } from '#seedwork/application/use-case';
import { CategoryRepository } from '#category/domain/repository';
import {
  PaginationOutputDto,
  PaginationOutputMapper,
  SearchInputDto,
} from '#seedwork/application/dto';

import { CategoryOutput, CategoryOutputMapper } from '../dto/category-output';

export namespace ListCategoriesUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private categoryRepo: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new CategoryRepository.SearchParams(input);

      const searchResult = await this.categoryRepo.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: CategoryRepository.SearchResult): Output {
      const items = searchResult.items.map((i) =>
        CategoryOutputMapper.toOutput(i),
      );
      const pagination = PaginationOutputMapper.toOutput(searchResult);
      return {
        items,
        ...pagination,
      };
    }
  }

  export type Input = SearchInputDto;

  export type Output = PaginationOutputDto<CategoryOutput>;
}
