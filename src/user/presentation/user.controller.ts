import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateUserDto, CreateUserUseCase } from "../application/use-cases/create-user.use-case";
import { User } from "../domain/entites/user.entity";
import { GetUserUseCase } from "../application/use-cases/get-user.use-case";
import { ListUserUseCase } from "../application/use-cases/list-user.use-case";
import { DeleteUserUseCase } from "../application/use-cases/delete-user.use-case";
import { UpdateUserDto, UpdateUserUseCase } from "../application/use-cases/update-user.use-case";

@Controller('users')
export class UserController{
  constructor(private readonly createUserUseCase: CreateUserUseCase,
             private readonly getUserUseCase: GetUserUseCase,
             private readonly listUserUseCase: ListUserUseCase,
             private readonly deleteUserUseCase: DeleteUserUseCase,
             private readonly updateUserUseCase: UpdateUserUseCase){}

  @Post()
  async createUser(@Body() request: CreateUserDto){
    const user = await this.createUserUseCase.execute(request);
    return this.mapUserToResponde(user);
  }
  @Get(':id')
  async getUser(@Param('id') id: string){
    const user = await this.getUserUseCase.execute(id);
    return this.mapUserToResponde(user);
  }
  @Get()
  async listUser(){
    const user = await this.listUserUseCase.execute();
    return user.map((user)=> this.mapUserToResponde(user))
  }
  @Patch(':id')
  async updateUser(@Param('id') id:string, @Body() body: UpdateUserDto){
    const user = await this.updateUserUseCase.axecute(id, body);
    return this.mapUserToResponde(user);
  }
  @Delete(':id')
    async deleteUser(@Param('id') id: string){
      await this.deleteUserUseCase.execute(id);
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
