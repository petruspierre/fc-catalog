import { UpdateCategoryUseCase } from '@pp/core/category/application';

export class UpdateCategoryDto
  implements Omit<UpdateCategoryUseCase.Input, 'id'>
{
  description?: string;
  is_active?: boolean;
  name: string;
}
