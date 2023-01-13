import { UpdatePatchUserDTO } from './dtos/update-patch-user.dto';
import { UpdatePutUserDTO } from './dtos/update-put-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateUserDTO) {
        data.password = data.password

        const salt = await bcrypt.genSalt()

        data.password = await bcrypt.hash(data.password, salt);

        return this.prisma.user.create({
            data
        });
    }

    async readAll() {
        return this.prisma.user.findMany(); 
    }

    async readOne(id: number) {
        await this.exists(id)

        return this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    async update(id: number, {name, email, password, birthAt, role}: UpdatePutUserDTO) {
        await this.exists(id)

        const salt = await bcrypt.genSalt()

        password = await bcrypt.hash(password, salt);

        return this.prisma.user.update({
            data: {
                name,
                email,
                password,
                birthAt: birthAt ? new Date(birthAt) : null,
                role
            },
            where: {
                id
            }
        });
    }

    async updatePartial(id: number, {name, email, password, birthAt, role}: UpdatePatchUserDTO) {
        await this.exists(id)

        const data: any = {}
        
        if(name) {
            data.name = name
        }

        if(email) {
            data.email = email
        }

        if(password) {
            const salt = await bcrypt.genSalt()

            data.password = await bcrypt.hash(password, salt);

        }

        if(birthAt) {
            data.birthAt = new Date(data.birthAt)
        }

        if(role) {
            data.role = role 
        }

        return this.prisma.user.update({
            data,
            where: {
                id
            }
        });
    }

    async delete(id: number) {
        await this.exists(id)

        return this.prisma.user.delete({
            where: {
                id
            }
        });
    }

    async exists(id: number) {
        if(!(await this.prisma.user.count({
            where: {
                id
            }
        }))) {
            throw new NotFoundException(`O usuário ${id} não existe`);
        }
    }
}