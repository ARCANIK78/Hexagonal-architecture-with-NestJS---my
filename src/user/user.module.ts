import { Module } from "@nestjs/common";
import { CreateUserUseCase } from "./application/use-cases/create-user.use-case";
import { USER_REPOSITORY } from "./application/port/user.repository.port";
import { InMemoryUserRepository } from "./infrastructure/adapter/in-memory-user.repository";
import { UserController } from "./presentation/user.controller";

@Module({
  controllers: [UserController],
  providers: [CreateUserUseCase,{
    provide: USER_REPOSITORY,
    useClass: InMemoryUserRepository,
  },
  ],
})
export class UserModel{}
