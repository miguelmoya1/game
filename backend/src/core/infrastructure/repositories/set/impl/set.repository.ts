import { Inject, Injectable } from '@nestjs/common';
import { CreateSetDataDto } from '../../../../application/commands';
import { UpdateSetDataDto } from '../../../../application/commands/set/dto/update-set-data.dto';
import {
  DATABASE_SERVICE,
  DatabaseService,
} from '../../../../application/services';
import { SetRepository } from '../contracts/set.repository.contract';
import { setToEntity } from '../mappers/set.mapper';

@Injectable()
export class SetRepositoryImpl implements SetRepository {
  constructor(
    @Inject(DATABASE_SERVICE) private readonly _database: DatabaseService,
  ) {}

  public async getAll() {
    const sets = await this._database.set.findMany();

    if (!sets) {
      return null;
    }

    return sets.map(setToEntity);
  }

  async search(criteria: string) {
    const result = await this._database.set.findMany({
      where: {
        OR: [
          {
            id: {
              contains: criteria,
              mode: 'insensitive',
            },
          },
          {
            name: {
              contains: criteria,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: criteria,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    return result.map((set) => setToEntity(set));
  }

  public async getById(id: string) {
    const set = await this._database.set.findUnique({
      where: {
        id,
      },
    });

    if (!set) {
      return null;
    }

    return setToEntity(set);
  }

  public async create(createUSerDto: CreateSetDataDto) {
    const set = await this._database.set.create({
      data: {
        name: createUSerDto.name,
        description: createUSerDto.description,
        effects: createUSerDto.effects,
      },
    });

    if (!set) {
      return null;
    }

    return setToEntity(set);
  }

  public async update(id: string, updateSetDto: UpdateSetDataDto) {
    const set = await this._database.set.update({
      where: { id },
      data: {
        name: updateSetDto.name,
        description: updateSetDto.description,
        effects: updateSetDto.effects,
      },
    });
    if (!set) {
      return null;
    }
    return setToEntity(set);
  }
}
