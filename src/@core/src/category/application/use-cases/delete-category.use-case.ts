import { CategoryRepository } from "#category/domain/repository";
import { UseCase as DefaultCategoryUseCase } from "#seedwork/application/use-case";

export namespace DeleteCategoryUseCase {
  export class UseCase implements DefaultCategoryUseCase<Input, Output> {
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
}
