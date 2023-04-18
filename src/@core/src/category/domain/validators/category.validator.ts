import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { CategoryProperties } from "../entities";
import { ClassValidatorFields } from "#seedwork/domain/validators";

export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  is_active: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor(data: CategoryProperties) {
    Object.assign(this, {
      name: data.name,
      description: data.description,
      is_active: data.is_active,
      created_at: data.created_at
    })
  }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules> {
  validate(data: CategoryProperties): boolean {
    return super.validate(new CategoryRules(data ?? {} as any))
  }
}

export default class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}