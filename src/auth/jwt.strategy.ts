import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "asdfgjnhujlkewtcbchetyhgfhfed"
        },);
    }

    async validate(payload: any) {
        return await payload;
    }
    // async validate(email :string, password :string){
    //     return 'success'
    // }
}