import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './../../enums//role.enum';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id?: number;

  @Column({
    nullable: false,
    length: 250,
  })
  name: string;

  @Column({
    nullable: false,
    length: 250,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
    length: 250,
  })
  password: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthAt?: Date;

  @CreateDateColumn({
    nullable: false,
  })
  createdAt?: Date;

  @UpdateDateColumn({
    nullable: false,
  })
  updatedAt?: Date;

  @Column({
    default: Role.USER,
  })
  role: number;
}
