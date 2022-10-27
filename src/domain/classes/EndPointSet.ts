import { Body, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BaseEntity, DeepPartial, Repository }                 from 'typeorm';
import { QueryDeepPartialEntity }                              from 'typeorm/query-builder/QueryPartialEntity';

abstract class EndPointSet<T extends BaseEntity> {
  protected abstract readonly repository: Repository<T>;

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.repository.findOneBy({ id });
  }

  @Get('list')
  async list(): Promise<T[]> {
    return this.repository.find();
  }

  @Post()
  async post(@Body() dto: DeepPartial<T>): Promise<T> {
    return this.repository.save(dto);
  }

  @Delete()
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    // TODO: implement "disable" item instead of delete
    // await this.repository.delete(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: QueryDeepPartialEntity<T>,
  ): Promise<void> {
    this.repository.update(id, dto);
  }
}
