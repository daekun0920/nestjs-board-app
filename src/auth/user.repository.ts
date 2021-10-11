import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./auth-credential.dto";
import { User } from "./user.entity";

@EntityRepository()
export class UserRepository extends Repository<User> {

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
        const user = this.create({ username, password })
        try {
            await this.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('User name already exists.');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

}