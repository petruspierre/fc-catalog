import { UniqueEntityId } from "../value-objects/unique-entity-id.vo";
import { Entity } from "./entity";
import { validate as uuidValidate } from "uuid";

class StubEntity extends Entity<{ prop1: string; prop2: number }> {}

describe("Entity Unit Tests", () => {
  it("should set props and id", () => {
    const props = { prop1: "prop1 value", prop2: 2 };
    const entity = new StubEntity(props);

    expect(entity.props).toStrictEqual(props);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(uuidValidate(entity.id)).toBe(true);
  });

  it("should accept a valid uuid", () => {
    const props = { prop1: "prop1 value", prop2: 2 };
    const id = new UniqueEntityId();
    const entity = new StubEntity(props, id);

    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe(id.value);
  });

  it("should convert an entity to plain js object", () => {
    const props = { prop1: "prop1 value", prop2: 2 };
    const entity = new StubEntity(props);

    expect(entity.toJSON()).toStrictEqual({ id: entity.id, ...props });
  });
});
