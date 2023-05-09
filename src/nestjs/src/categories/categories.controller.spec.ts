import {
  CreateCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from '@pp/core/category/application';
import { CategoriesController } from './categories.controller';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { SearchCategoryDto } from './dto/search-category.dto';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  it('should create a category', async () => {
    const output: CreateCategoryUseCase.Output = {
      created_at: new Date(),
      description: 'some description',
      id: 'f1b9a8d0-8f7d-4c5e-8a6a-3f5e2f1c0e1e',
      is_active: true,
      name: 'Movie',
    };
    const mockCreateUseCase = {
      execute: jest.fn().mockResolvedValue(output),
    };

    // @ts-expect-error
    controller['createUseCase'] = mockCreateUseCase;
    const input: CreateCategoryDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };
    const controllerOutput = await controller.create(input);

    expect(mockCreateUseCase.execute).toBeCalledWith(input);
    expect(controllerOutput).toStrictEqual(output);
  });

  it('should update a category', async () => {
    const categoryId = 'f1b9a8d0-8f7d-4c5e-8a6a-3f5e2f1c0e1e';
    const output: UpdateCategoryUseCase.Output = {
      created_at: new Date(),
      description: 'some description',
      id: categoryId,
      is_active: true,
      name: 'Movie',
    };
    const mockUpdateUseCase = {
      execute: jest.fn().mockResolvedValue(output),
    };

    // @ts-expect-error
    controller['updateUseCase'] = mockUpdateUseCase;
    const input: UpdateCategoryDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };

    const controllerOutput = await controller.update(categoryId, input);

    expect(mockUpdateUseCase.execute).toBeCalledWith({
      id: categoryId,
      ...input,
    });
    expect(controllerOutput).toStrictEqual(output);
  });

  it('should delete a category', async () => {
    const output = undefined;
    const categoryId = 'f1b9a8d0-8f7d-4c5e-8a6a-3f5e2f1c0e1e';
    const mockDeleteUseCase = {
      execute: jest.fn().mockResolvedValue(output),
    };

    // @ts-expect-error
    controller['deleteUseCase'] = mockDeleteUseCase;

    const controllerOutput = await controller.remove(categoryId);
    expect(controller.remove(categoryId)).toBeInstanceOf(Promise);

    expect(mockDeleteUseCase.execute).toBeCalledWith({ id: categoryId });
    expect(controllerOutput).toStrictEqual(output);
  });

  it('should get a category', async () => {
    const categoryId = 'f1b9a8d0-8f7d-4c5e-8a6a-3f5e2f1c0e1e';
    const output: GetCategoryUseCase.Output = {
      created_at: new Date(),
      description: 'some description',
      id: categoryId,
      is_active: true,
      name: 'Movie',
    };

    const mockGetUseCase = {
      execute: jest.fn().mockResolvedValue(output),
    };

    // @ts-expect-error
    controller['getUseCase'] = mockGetUseCase;

    const controllerOutput = await controller.findOne(categoryId);
    expect(controller.findOne(categoryId)).toBeInstanceOf(Promise);

    expect(mockGetUseCase.execute).toBeCalledWith({ id: categoryId });
    expect(controllerOutput).toStrictEqual(output);
  });

  it('should list categories', async () => {
    const output: ListCategoriesUseCase.Output = {
      items: [
        {
          created_at: new Date(),
          description: 'some description',
          id: 'f1b9a8d0-8f7d-4c5e-8a6a-3f5e2f1c0e1e',
          is_active: true,
          name: 'Movie',
        },
      ],
      total: 1,
      current_page: 1,
      last_page: 1,
      per_page: 1,
    };

    const mockListUseCase = {
      execute: jest.fn().mockResolvedValue(output),
    };

    const searchParams: SearchCategoryDto = {
      page: 1,
      per_page: 1,
      sort: 'name',
      sort_dir: 'desc',
      filter: 'test',
    };

    // @ts-expect-error
    controller['listUseCase'] = mockListUseCase;

    const controllerOutput = await controller.search(searchParams);
    expect(controller.search(searchParams)).toBeInstanceOf(Promise);

    expect(mockListUseCase.execute).toBeCalledWith(searchParams);
    expect(controllerOutput).toStrictEqual(output);
  });
});
