import { PaginationOutputMapper } from "./pagination-output";
import { SearchResult } from '../../domain/repository/repository-contracts';

describe("PaginationOutputMapper Unit Tests", () => {
  it("should convert a SearchResult into a output", () => {
    const result = new SearchResult({
      items: ['fake'] as any,
      total: 1,
      current_page: 1,
      per_page: 1,
      filter: "fake",
      sort: "field",
      sort_dir: "desc"
    })

    const output = PaginationOutputMapper.toOutput(result);

    expect(output).toStrictEqual({
      total: 1,
      current_page: 1,
      per_page: 1,
      last_page: 1
    })
  });
});
