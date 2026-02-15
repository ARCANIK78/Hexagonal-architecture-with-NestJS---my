import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { USER_REPOSITORY } from './application/port/user.repository.port';
import { MongooseUserRepository } from './infrastructure/adapter/mongoose-user.repository';
import {
  UserMongooseDoc,
  UserMongooseSchema,
} from './infrastructure/adapter/user.mongoose-schema';
import { UserController } from './presentation/user.controller';
import { GetUserUseCase } from './application/use-cases/get-user.use-case';
import { ListUserUseCase } from './application/use-cases/list-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserMongooseDoc.name, schema: UserMongooseSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    ListUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: MongooseUserRepository,
    },
  ],
})
export class UserModel {}
