import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto, CreateUserUseCase } from "../application/use-cases/create-user.use-case";
import { User } from "../domain/entites/user.entity";

@Controller('users')
export class UserController{
  constructor(private createUserUseCase: CreateUserUseCase){}

  @Post()
  async createUser(@Body() request: CreateUserDto){
    const user = await this.createUserUseCase.execute(request);
    return this.mapUserToResponde(user);
  }
  private mapUserToResponde(user: User){
    return{
      id: user.getId().getvalue(),
      name: user.getName(),
      email: user.getEmail().getValue(),
      password: user.getPassword().getValue(),
      createAt: user.getCreateAt(),
      updateAt: user.getUpdateAt(),
      accontAge: user.getAccountAge(),
    }
  }
}
