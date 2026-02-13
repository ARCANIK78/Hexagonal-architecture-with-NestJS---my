import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY, UserRepositoryPort } from "../port/user.repository.port";

@Injectable()
export class DeleteUserUseCase{
  constructor(
    @Inject(USER_REPOSITORY)
    private  readonly userRepository: UserRepositoryPort,
  ){}
  async execute(id: string){
    await this.userRepository.delete(id);
  }
}
