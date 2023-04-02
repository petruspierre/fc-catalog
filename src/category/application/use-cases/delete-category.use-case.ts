import CategoryRepository from "../../domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";
import { UseCase } from "../../../@seedwork/application/use-case";

export class DeleteCategoryUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepo: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const entity = await this.categoryRepo.findById(input.id);
    await this.categoryRepo.delete(entity.id);
  }
}

export type Input = {
  id: string;
};

export type Output = void;
