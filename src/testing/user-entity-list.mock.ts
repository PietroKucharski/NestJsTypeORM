import { Role } from '../enums/role.enum';
import { UserEntity } from '../user/entities/user.entity';

export const userEntityList: UserEntity[] = [
  {
    id: 1,
    name: 'Teste',
    email: 'teste@hotmail.com',
    password: '$2b$10$DFNHiMUU7mRqLyHKcs1fAORn/AUvGNJCR5r8qmsfc/2RUL8kE3L1e',
    birthAt: new Date('2000-01-01'),
    role: Role.ADMIN,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Pietro Kucharski',
    email: 'pietro@hotmail.com',
    password: '$2b$10$DFNHiMUU7mRqLyHKcs1fAORn/AUvGNJCR5r8qmsfc/2RUL8kE3L1e',
    birthAt: new Date('2000-01-01'),
    role: Role.ADMIN,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'Francine Kucharski',
    email: 'francine@hotmail.com',
    password: '$2b$10$DFNHiMUU7mRqLyHKcs1fAORn/AUvGNJCR5r8qmsfc/2RUL8kE3L1e',
    birthAt: new Date('2000-01-01'),
    role: Role.ADMIN,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
