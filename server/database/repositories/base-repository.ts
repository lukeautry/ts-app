import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from "typeorm";
import { environment } from "../../config/environment";
import { BaseEntity, IBaseEntity } from "../entities/base";
import { getDbConnection } from "../get-db-connection";
import { PostgresError } from "../postgres/postgres-error";

export abstract class BaseRepository<
  // Props in an existing record
  Props extends IBaseEntity,
  // Class representing TypeORM model
  Class extends BaseEntity & Props,
  // Props required to create this record
  RequiredProps
> {
  constructor(private readonly classFn: new () => Class) {}

  public findOne(options: FindOneOptions<Class>): Promise<Props | undefined> {
    return this.execute((repo) => repo.findOne(options));
  }

  public find(options: FindManyOptions<Class>): Promise<Props[]> {
    return this.execute((repo) => repo.find(options));
  }

  public create(model: RequiredProps & Partial<Props>): Promise<Props> {
    if (!model.date_created) {
      model.date_created = model.date_updated = new Date();
    }

    return this.execute((repo) => repo.save(model));
  }

  public update(model: RequiredProps & Props): Promise<Props> {
    return this.execute((repo) =>
      repo.save({
        ...model,
        date_updated: new Date(),
      })
    );
  }

  public async delete(options: FindConditions<Class>): Promise<void> {
    await this.execute((repo) => repo.delete(options));
  }

  private async execute<P>(fn: (repo: Repository<Class>) => Promise<P>) {
    try {
      const repo = await this.getRepository();
      return await fn(repo);
    } catch (err) {
      throw new PostgresError(err.message, err);
    }
  }

  private async getRepository(): Promise<Repository<Class>> {
    const { DB_CONNECTION } = environment;
    const connection = await getDbConnection(DB_CONNECTION);
    return connection.getRepository<Class>(this.classFn);
  }
}
