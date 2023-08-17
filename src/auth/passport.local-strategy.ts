import { Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { UserDto } from "src/user/user.dto";
import { errRes } from "./auth.controller";
@Injectable()
export class PassportLocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({ usernameField: 'email' });
    }
    async validate(email: string, password: string): Promise<UserDto | errRes> {
        const user = await this.userService.getUserByEmail(email);
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!passwordValid || !user) {
            return {
                message: "user credentials not matched",
                status: 400
            };
        }
        if (user && passwordValid) {
            return user;
        }
    }
}