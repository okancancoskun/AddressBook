import {
  AnyKeys,
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWriteOpResult,
  mongo,
} from 'mongoose';
import { PaginationResult } from '../types/pagination-result.type';

interface IGenericService<T> {
  findAll(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T[]>;

  findPaginated(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<PaginationResult<T>>;

  create(dto: Partial<T> | AnyKeys<T>): Promise<T>;

  deleteOne(filter: FilterQuery<T>): Promise<mongo.DeleteResult>;

  updateOne(
    filter: FilterQuery<T>,
    update?: UpdateQuery<T> | Partial<T>,
    options?: QueryOptions<T>,
  ): Promise<UpdateWriteOpResult>;

  count(filter?: FilterQuery<T>): Promise<number>;
}
export class GenericService<T> implements IGenericService<T> {
  constructor(private readonly model: Model<T>) {}

  public async findAll(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T[]> {
    return this.model.find(filter, projection, options);
  }

  public async findPaginated(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<PaginationResult<T>> {
    const totalCount = await this.count(filter);
    const totalPages = Math.ceil(totalCount / options.limit);
    const page = options.page;
    const data = await this.model.find(filter, projection, { ...options });
    return {
      data,
      meta: {
        totalCount,
        totalPages,
        limit: options.limit,
        page,
      },
    };
  }

  public async findOne(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T> {
    return this.model.findOne(filter, projection, options);
  }

  public async create(dto: Partial<T> | AnyKeys<T>): Promise<T> {
    return this.model.create(dto);
  }

  public async deleteOne(filter: FilterQuery<T>): Promise<mongo.DeleteResult> {
    return this.model.deleteOne(filter);
  }

  public async updateOne(
    filter: FilterQuery<T>,
    update?: UpdateQuery<T> | Partial<T>,
    options?: QueryOptions<T>,
  ): Promise<UpdateWriteOpResult> {
    return this.model.findOneAndUpdate(filter, update, options);
  }

  public async count(filter?: FilterQuery<T>): Promise<number> {
    return this.model.countDocuments(filter);
  }
}
