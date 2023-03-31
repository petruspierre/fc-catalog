import Entity from "../../entity/entity";
import { NotFoundError } from "../../errors/not-found.error";
import { UniqueEntityId } from "../../value-objects/unique-entity-id.vo";
import { InMemoryRepository } from "./../in-memory.repository";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository Unit Tests", () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  it("should insert a new entity", async () => {
    const entity = new StubEntity({ name: "test", price: 1 });
    await repository.insert(entity);

    expect(repository.items[0].toJSON()).toStrictEqual(entity.toJSON());
  });

  it("should throw an error when entity is not found", () => {
    expect(repository.findById("not-found")).rejects.toThrow(
      new NotFoundError("Entity not found using ID not-found")
    );

    const id = new UniqueEntityId();
    expect(repository.findById(id)).rejects.toThrow(
      new NotFoundError(`Entity not found using ID ${id}`)
    );
  });

  it("should find a entity by id", async () => {
    const entity = new StubEntity({ name: "test", price: 1 });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entityFound.toJSON()).toStrictEqual(entity.toJSON());

    entityFound = await repository.findById(entity.uniqueEntityId);
    expect(entityFound.toJSON()).toStrictEqual(entity.toJSON());
  });

  it("should return all entities", async () => {
    const entity = new StubEntity({ name: "test", price: 1 });
    await repository.insert(entity);

    const entity2 = new StubEntity({ name: "test2", price: 2 });
    await repository.insert(entity2);

    const entities = await repository.findAll();
    expect(entities.length).toBe(2);
    expect(entities[0].toJSON()).toStrictEqual(entity.toJSON());
    expect(entities[1].toJSON()).toStrictEqual(entity2.toJSON());
  });

  it("should throw an error on update when entity is not found", () => {
    const entity = new StubEntity({ name: "test", price: 1 });
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity not found using ID ${entity.id}`)
    );
  });

  it("should throw an error on delete when entity is not found", () => {
    expect(repository.delete("not-found")).rejects.toThrow(
      new NotFoundError("Entity not found using ID not-found")
    );

    const id = new UniqueEntityId();
    expect(repository.delete(id)).rejects.toThrow(
      new NotFoundError(`Entity not found using ID ${id}`)
    );
  });

  it("should update a entity", async () => {
    const entity = new StubEntity({ name: "test", price: 1 });
    await repository.insert(entity);

    const entity2 = new StubEntity(
      { name: "test2", price: 2 },
      entity.uniqueEntityId
    );
    await repository.update(entity2);

    const entityFound = await repository.findById(entity.id);
    expect(entityFound).toStrictEqual(entity2);
  });

  it("should delete a entity", async () => {
    let entity = new StubEntity({ name: "test", price: 1 });
    await repository.insert(entity);

    await repository.delete(entity.id);

    expect(repository.items.length).toBe(0);

    entity = new StubEntity({ name: "test", price: 1 });
    await repository.insert(entity);

    await repository.delete(entity.uniqueEntityId);

    expect(repository.items.length).toBe(0);
  });
});
