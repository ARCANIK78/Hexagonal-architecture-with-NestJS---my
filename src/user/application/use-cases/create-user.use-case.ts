import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/user/domain/entites/user.entity";
import { USER_REPOSITORY, UserRepositoryPort } from "../port/user.repository.port";

export interface CreateUserDto{
  name: string;
  email: string;
  password: string;
}
@Injectable()
export class CreateUserUseCase{
  constructor(@Inject(USER_REPOSITORY)
             private readonly userRepository: UserRepositoryPort){}
  async execute(dto: CreateUserDto): Promise<User>{
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if(existingUser){
      throw new Error("User with this email already exists.")
    }
    const user = User.create(dto.name, dto.email, dto.password);
    const savedUser = await this.userRepository.save(user);
    return savedUser
  }
}

