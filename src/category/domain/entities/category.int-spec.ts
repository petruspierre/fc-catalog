import { EntityValidationError } from "../../../@seedwork/domain/errors/validation.error";
import { Category } from "./category";

describe("Category Integration Tests", () => {
  describe("create method", () => {
    it("should not allow invalid category name", () => {
      expect(() => new Category({ name: null })).toContainErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => new Category({ name: "" })).toContainErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() => new Category({ name: 5 as any })).toContainErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(
        () => new Category({ name: "a".repeat(256) })
      ).toContainErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    it("should not allow invalid category description", () => {
      expect(
        () => new Category({ description: 5 } as any)
      ).toContainErrorMessages({
        description: ["description must be a string"],
      });
    });

    it("should not allow invalid category is_active", () => {
      expect(
        () => new Category({ is_active: 0 } as any)
      ).toContainErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });
    });

    it("should create valid category", () => {
      expect.assertions(0);
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
    });
  });

  describe("update method", () => {
    it("should not allow invalid category name", () => {
      const category = new Category({ name: "Category" });

      expect(() => category.update(null, null)).toContainErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => category.update("", null)).toContainErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() => category.update(5 as any, null)).toContainErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() =>
        category.update("a".repeat(256), null)
      ).toContainErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    it("should not allow invalid category description", () => {
      const category = new Category({
        name: "Category",
        description: "Description",
      });

      expect(() =>
        category.update("Category", 5 as any)
      ).toContainErrorMessages({
        description: ["description must be a string"],
      });
    });

    it("should create valid category", () => {
      expect.assertions(0);
      const category = new Category({
        name: "Movie",
      });
      category.update("Movie 2", "Category description");
      category.update("Movie 2", null);
    });
  });
});
