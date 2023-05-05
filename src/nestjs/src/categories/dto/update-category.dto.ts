import { UpdateCategoryUseCase } from '@pp/core/category/application';

export class UpdateCategoryDto implements UpdateCategoryUseCase.Input {
  id: string;
  description?: string;
  is_active?: boolean;
  name: string;
}
