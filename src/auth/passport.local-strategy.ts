import { Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { UserDto } from "src/user/user.dto";

@Injectable()
export class PassportLocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({ usernameField: 'email'});
    }

    async validate(email: string, password: string): Promise<UserDto | null> {
        const user = await this.userService.getUserByEmail(email);
        
       /// if (user == undefined || user.isAdmin === false ) {
        if (user == undefined ) {
            throw new UnauthorizedException();
        }

        const passwordValid = await bcrypt.compare(password, user.password)
        if (user && passwordValid) {
            return user;
        }
    }
}