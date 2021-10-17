import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){
        super({
            secretOrKey: 'Secret1234',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() // 헤더에서 베어러 토큰으로 가져온다
        })
    }


    // 위에서 토큰이 유효한지 체크가 되면 validate 메소드에서 payload에 있는 유저 이름이 데이터베이스에 있는 유저이름인지 확인 후
    // 있다면 유저 객체를 return 값으로 던져 준다.
    // return 값은 @UseGuards(AuthGuard())를 이용한 모든 요청의 Request Object로 들어 감
    async validate(payload) {
        const { username } = payload;
        const user: User = await this.userRepository.findOne({ username });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}