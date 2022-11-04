import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Epic extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

}

