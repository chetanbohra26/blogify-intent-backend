import { ExecutionContext, Inject, Injectable, IntentGuard } from "@intentjs/core";
import { UserDbRepository } from "app/repositories";
import { verify } from "jsonwebtoken";

@Injectable()
export class JwtGuard extends IntentGuard {
    constructor(
        @Inject('USER_DB_REPO') private users: UserDbRepository,
    ) {
        super();
    }
    async guard(ctx: ExecutionContext): Promise<boolean> {
        const req = ctx.switchToHttp().getRequest();
        const token = req.headers['authorization'];
        try {
            const payload = verify(token, process.env.JWT_SECRET);
            const user = await this.users.firstWhere({ id: payload.sub }, false);
            if (!user) return false;

            req.$user = user;
            return true;
        } catch (err) {
            console.log("🚀 ~ file: jwt.ts:14 ~ JwtGuard ~ guard ~ err:", err);
        }

        return false;
    }
}