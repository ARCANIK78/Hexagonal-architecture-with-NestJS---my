import { Module } from "@nestjs/common";
import { CreateUserUseCase } from "./application/use-cases/create-user.use-case";
import { USER_REPOSITORY } from "./application/port/user.repository.port";
import { InMemoryUserRepository } from "./infrastructure/adapter/in-memory-user.repository";
import { UserController } from "./presentation/user.controller";
import { GetUserUseCase } from "./application/use-cases/get-user.use-case";
import { ListUserUseCase } from "./application/use-cases/list-user.use-case";
import { DeleteUserUseCase } from "./application/use-cases/delete-user.use-case";
import { UpdateUserUseCase } from "./application/use-cases/update-user.use-case";

@Module({
  controllers: [UserController],
  providers: [CreateUserUseCase,GetUserUseCase,ListUserUseCase, DeleteUserUseCase,
    UpdateUserUseCase,{
      provide: USER_REPOSITORY,
      useClass: InMemoryUserRepository,
  },
  ],
})
export class UserModel{}
