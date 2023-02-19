import ValidationError from "../../../@seedwork/errors/validation.error"
import { Category } from "./category"

describe("Category Integration Tests", () => {
  describe("create method", () => {
    it('should not allow invalid category name', () => {
      expect(() => 
        new Category({ name: null })
      ).toThrow(new ValidationError('name is required.'))
  
      expect(() => 
        new Category({ name: "" })
      ).toThrow(new ValidationError('name is required.'))
  
      expect(() => 
        new Category({ name: 5 as any })
      ).toThrow(new ValidationError('name must be a string.'))
  
      expect(() => 
        new Category({ name: "a".repeat(256) })
      ).toThrow(new ValidationError('name must be less or equal than 255 characters.'))
    })
  
    it('should not allow invalid category description', () => {
      expect(() => 
        new Category({ name: 'Category', description: 5 as any })
      ).toThrow(new ValidationError('description must be a string.'))
    })
  
    it('should not allow invalid category is_active', () => {
      expect(() => 
        new Category({ name: 'Category', is_active: 5 as any })
      ).toThrow(new ValidationError('is_active must be a boolean.'))
    })

    it('should create valid category', () => {
      expect.assertions(0)
      /* NOSONAR */ new Category({
        name: "Movie",
      });
      /* NOSONAR */ new Category({
        name: "Movie",
        description: "Category description",
      });
      /* NOSONAR */ new Category({
        name: "Movie",
        description: "Category description",
        is_active: false,
      });
      /* NOSONAR */ new Category({
        name: "Movie",
        description: "Category description",
        created_at: new Date(),
      });
      /* NOSONAR */ new Category({
        name: "Movie",
        description: "Category description",
        is_active: false,
        created_at: new Date(),
      });
    })
  })

  describe('update method', () => {
    it('should not allow invalid category name', () => {
      const category = new Category({ name: 'Category' })
      expect(() => {
        category.update(null, null)
      }).toThrow(new ValidationError('name is required.'))
  
      expect(() => {
        category.update("", null)
      }).toThrow(new ValidationError('name is required.'))
  
      expect(() => {
        category.update(5 as any, null)
      }).toThrow(new ValidationError('name must be a string.'))
  
      expect(() => {
        category.update("a".repeat(256), null)
      }).toThrow(new ValidationError('name must be less or equal than 255 characters.'))
    })
  
    it('should not allow invalid category description', () => {
      const category = new Category({ name: 'Category', description: 'Description' })

      expect(() => {
        category.update('Category', 5 as any)
      }).toThrow(new ValidationError('description must be a string.'))
    })

    it('should create valid category', () => {
      expect.assertions(0)
      const category = new Category({
        name: "Movie",
      });
      category.update('Movie 2', 'Category description')
      category.update('Movie 2', null)
    })
  })
})