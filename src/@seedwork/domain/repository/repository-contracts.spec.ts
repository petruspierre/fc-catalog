import { SearchParams } from "./repository-contracts"

describe('SearchParams Unit Tests', () => {
  test('page prop', () => {
    const defaultValue = 1
    const params = new SearchParams();
    expect(params.page).toBe(defaultValue);

    const arrange = [
      { page: null, expected: defaultValue },
      { page: undefined, expected: defaultValue },
      { page: "", expected: defaultValue },
      { page: "fake", expected: defaultValue },
      { page: -1, expected: defaultValue },
      { page: 0, expected: defaultValue },
      { page: 5.5, expected: defaultValue },
      { page: {}, expected: defaultValue },
      { page: false, expected: defaultValue },
      { page: true, expected: defaultValue },
      { page: 1, expected: 1 },
      { page: 2, expected: 2 },
    ]

    arrange.forEach(i => {
      expect(new SearchParams({ page: i.page as any }).page).toBe(i.expected);
    })
  })

  test('per_page prop', () => {
    const defaultValue = 15
    const params = new SearchParams();
    expect(params.per_page).toBe(defaultValue);

    const arrange = [
      { per_page: null, expected: defaultValue },
      { per_page: undefined, expected: defaultValue },
      { per_page: "", expected: defaultValue },
      { per_page: "fake", expected: defaultValue },
      { per_page: -1, expected: defaultValue },
      { per_page: 0, expected: defaultValue },
      { per_page: 5.5, expected: defaultValue },
      { per_page: {}, expected: defaultValue },
      { per_page: false, expected: defaultValue },
      { per_page: true, expected: defaultValue },
      { per_page: 1, expected: 1 },
      { per_page: 2, expected: 2 },
    ]

    arrange.forEach(i => {
      expect(new SearchParams({ per_page: i.per_page as any }).per_page).toBe(i.expected);
    })
  })

  test('sort prop', () => {
    const defaultValue = null
    const params = new SearchParams();
    expect(params.sort).toBe(defaultValue);

    const arrange = [
      { sort: null, expected: defaultValue },
      { sort: undefined, expected: defaultValue },
      { sort: "", expected: defaultValue },
      { sort: "field", expected: "field" },
      { sort: -1, expected: "-1" },
      { sort: 0, expected: "0" },
      { sort: 5.5, expected: "5.5" },
      { sort: {}, expected: "[object Object]" },
      { sort: false, expected: "false" },
      { sort: true, expected: "true" },
      { sort: 1, expected: "1" },
      { sort: 2, expected: "2" },
    ]

    arrange.forEach(i => {
      expect(new SearchParams({ sort: i.sort as any }).sort).toBe(i.expected);
    })
  })

  test('sort_dir prop', () => {
    const defaultValue = "asc"
    let params = new SearchParams();
    expect(params.sort_dir).toBeNull();

    params = new SearchParams({ sort: null });
    expect(params.sort_dir).toBeNull();

    params = new SearchParams({ sort: undefined });
    expect(params.sort_dir).toBeNull();

    params = new SearchParams({ sort: "" });
    expect(params.sort_dir).toBeNull();

    const arrange = [
      { sort_dir: null, expected: defaultValue },
      { sort_dir: undefined, expected: defaultValue },
      { sort_dir: "", expected: defaultValue },
      { sort_dir: "field", expected: defaultValue },
      { sort_dir: -1, expected: defaultValue },
      { sort_dir: 0, expected: defaultValue },
      { sort_dir: 5.5, expected: defaultValue },
      { sort_dir: {}, expected:defaultValue },
      { sort_dir: false, expected: defaultValue },
      { sort_dir: true, expected: defaultValue },
      { sort_dir: 1, expected: defaultValue },
      { sort_dir: "asc", expected: "asc" },
      { sort_dir: "ASC", expected: "asc" },
      { sort_dir: "Asc", expected: "asc" },
      { sort_dir: "desc", expected: "desc" },
      { sort_dir: "DESC", expected: "desc" },
      { sort_dir: "desC", expected: "desc" },
    ]

    arrange.forEach(i => {
      expect(new SearchParams({ sort: "field", sort_dir: i.sort_dir as any }).sort_dir).toBe(i.expected);
    })
  })

  test('filter prop', () => {
    const defaultValue = null
    const params = new SearchParams();
    expect(params.filter).toBe(defaultValue);

    const arrange = [
      { filter: null, expected: defaultValue },
      { filter: undefined, expected: defaultValue },
      { filter: "", expected: defaultValue },
      { filter: "field", expected: "field" },
      { filter: -1, expected: "-1" },
      { filter: 0, expected: "0" },
      { filter: 5.5, expected: "5.5" },
      { filter: {}, expected: "[object Object]" },
      { filter: false, expected: "false" },
      { filter: true, expected: "true" },
      { filter: 1, expected: "1" },
      { filter: 2, expected: "2" },
    ]

    arrange.forEach(i => {
      expect(new SearchParams({ filter: i.filter as any }).filter).toBe(i.expected);
    })
  })
})