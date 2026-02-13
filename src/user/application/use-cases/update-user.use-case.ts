import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { USER_REPOSITORY, UserRepositoryPort } from "../port/user.repository.port";

export interface UpdateUserDto{
  name?: string;
  email?: string;
  password?: string;
}
@Injectable()
export class UpdateUserUseCase{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,){}
    async axecute(id: string, dto:UpdateUserDto){
      const user = await this.userRepository.findById(id)
      if(!user){
        throw new  NotFoundException("user not found.")
      }
      if(dto.name){
        user.updateName(dto.name)
      }
      if(dto.email){
        user.updateEmail(dto.email)
      }
      if(dto.password){
        user.updatePassword(dto.password);
      }
      return this.userRepository.save(user);
    }
}
