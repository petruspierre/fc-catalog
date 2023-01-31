import { omit } from "lodash";

import { Category } from "./category";
import { UniqueEntityId } from "../../../@seedwork/domain/unique-entity-id.vo";

describe("Category Unit Tests", () => {
  test("constructor of category", () => {
    let category = new Category({ name: "Movie" });

    let props = omit(category.props, "created_at");

    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: "Movie",
      description: "Category description",
      is_active: false,
      created_at,
    });

    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "Category description",
      is_active: false,
      created_at,
    });
  });

  test('id field', () => {
    const data = [
      { props: { name: 'Movie '}},
      { props: { name: 'Movie '}, id: null },
      { props: { name: 'Movie '}, id: undefined },
      { props: { name: 'Movie '}, id: new UniqueEntityId() },
    ]

    data.forEach(i => {
      const category = new Category(i.props, i.id);

      expect(category.id).not.toBeNull();
      expect(category.id).toBeInstanceOf(UniqueEntityId);
    })
  })

  test('getter of name prop', () => {
    const category = new Category({name: 'Movie'})

    expect(category.name).toBe('Movie')
  })

  test('getter and setter of description prop', () => {
    let category = new Category({name: 'Movie'})

    expect(category.description).toBe(null)

    category = new Category({name: 'Movie', description: 'Category description'})

    expect(category.description).toBe('Category description')

    category = new Category({name: 'Movie'})
    category['description'] = 'Category description'

    expect(category.description).toBe('Category description')
  })

  test('getter and setter of is_active prop', () => {
    let category = new Category({name: 'Movie'})

    expect(category.is_active).toBe(true)

    category = new Category({name: 'Movie', is_active: false})

    expect(category.is_active).toBe(false)

    category = new Category({name: 'Movie'})
    category['is_active'] = false

    expect(category.is_active).toBe(false)
  })

  test('getter of created_at prop', () => {
    let category = new Category({name: 'Movie'})

    expect(category.created_at).toBeInstanceOf(Date)

    const created_at = new Date()
    category = new Category({name: 'Movie', created_at})

    expect(category.created_at).toBe(created_at)
  })
});
