import { CategoryRepository } from "#category/domain/repository";
import { Category } from "#category/domain/entities";
import { UseCase } from "#seedwork/application/use-case";

import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";

export class CreateCategoryUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepo: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const entity = new Category(input);
    await this.categoryRepo.insert(entity);

    return CategoryOutputMapper.toOutput(entity);
  }
}

export type Input = {
  name: string;
  description?: string;
  is_active?: boolean;
};

export type Output = CategoryOutput;
