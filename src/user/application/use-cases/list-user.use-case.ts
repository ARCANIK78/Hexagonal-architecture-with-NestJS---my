import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY, UserRepositoryPort } from "../port/user.repository.port";

@Injectable()
export class ListUserUseCase{
  constructor(@Inject(USER_REPOSITORY)
    private readonly userRepository : UserRepositoryPort,){}
    async execute(){
      return this.userRepository.findAll();
    }
}
