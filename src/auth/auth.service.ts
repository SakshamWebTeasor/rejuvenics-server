import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./auth.dto";


@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {
    }
    async login(user:any):Promise<AuthDto>{
        const token = this.jwtService.sign({
            user_id :user._id,
            user_name :user.name,
            user_email :user.email,
            isAdmin :user.isAdmin,
        })

        const user_data = {
            success : true,
            acess_token :token,
            id :user._id,
            name :user.name,
            email :user.email,
            phone :user.phone,
            isAdmin :user.isAdmin,
        }
        return user_data;
    }
}